import Razorpay from "razorpay";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import dotenv from "dotenv";
import prisma from "../db";
import { PricingPlans } from "../utils/plans";
dotenv.config();

// Define clear interfaces for type safety
interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
  employeeLimit: number;
  documentLimit: number;
  projectLimit: number;
  researchLimit: number;
}

interface CreateSubscriptionParams {
  planId: string;
  billingCycle: "monthly" | "yearly";
  adminId: string;
  notes?: Record<string, any>;
}

interface SubscriptionResponse {
  success: boolean;
  orderId?: string;
  subscriptionId?: string;
  amount?: number;
  currency?: string;
  error?: string;
  link?: string;
}
// Initialize Razorpay client
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/**
 * Creates a subscription for a user based on the selected plan and billing cycle
 * Important: This only creates the subscription in pending state and doesn't update any limits
 * until payment is captured. The admin stays on free plan limits until payment is confirmed.
 */
export const createSubscriptionService = async ({
  planId,
  billingCycle,
  adminId,
  notes = {},
}: CreateSubscriptionParams): Promise<SubscriptionResponse> => {
  try {
    // Find plan by ID
    const plan = PricingPlans.find((p) => p.id === planId);
    if (!plan) {
      throw new Error(`Invalid plan ID: ${planId}`);
    }

    // Free plan handling - immediately apply free plan without payment
    if (planId === "free") {
      await migrateToFreePlan(adminId);
      return {
        success: true,
        subscriptionId: (
          await prisma.subscription.findFirst({
            where: { adminId },
            select: { id: true },
          })
        )?.id,
      };
    }

    // Get the current admin subscription status
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      include: { subscription: true },
    });

    if (!admin) {
      throw new Error(`Admin not found: ${adminId}`);
    }

    // Ensure admin is on free plan if they don't have an active paid subscription
    // This is to prevent any scenario where admin might have elevated privileges without payment
    if (
      !admin.subscription ||
      admin.subscription.status !== "active" ||
      admin.subscription.planId === "free"
    ) {
      // Make sure admin has free plan limits while they're waiting for payment confirmation
      const freePlan = PricingPlans.find((p) => p.id === "free");
      if (freePlan) {
        await prisma.admin.update({
          where: { id: adminId },
          data: {
            remainingProjectLimit: freePlan.projectLimit,
            remainginEmployeeLimit: freePlan.employeeLimit,
            remainingDocumentLimit: freePlan.documentLimit,
            remainingResearchLimit: freePlan.researchLimit,
            dailyResearchLimit: getPlanDailyResearchLimit("free"),
          },
        });
      }
    }

    // Check if admin already has a subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: { adminId },
    });

    // If subscription exists and has an active Razorpay order, cancel it first
    if (
      existingSubscription &&
      existingSubscription.razorpayOrderId &&
      existingSubscription.status !== "cancelled"
    ) {
      try {
        // Cancel the existing subscription in Razorpay
        await razorpay.subscriptions.cancel(
          existingSubscription.razorpayOrderId
        );
        console.log(
          `Cancelled existing Razorpay subscription: ${existingSubscription.razorpayOrderId}`
        );
      } catch (cancelError) {
        console.error(
          "Error cancelling existing subscription in Razorpay:",
          cancelError
        );
        // Continue with creating new subscription even if cancellation fails
      }
    }

    // Determine price based on billing cycle
    const amount =
      billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    const currency = "INR";

    // Create subscription in Razorpay
    const subscription = await razorpay.subscriptions.create({
      plan_id:
        billingCycle === "monthly"
          ? "plan_QOosLTsLC41Uj1"
          : "plan_QOortN5FLxH4QR",
      customer_notify: 1,
      quantity: 1,
      total_count: billingCycle === "monthly" ? 1 : 12,
      start_at: Math.floor(Date.now() / 1000) + 120, // Start in 2 minutes
      notes: {
        ...notes,
        adminId,
        planId,
        plan: plan.name,
        billingCycle,
      },
    });
    console.log("Subscription created in Razorpay:", subscription.id);

    // Calculate end date
    const startDate = new Date();
    const endDate = new Date();
    if (billingCycle === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // Store subscription in database as pending (don't apply limits yet)
    const subInDb = await prisma.subscription.upsert({
      where: { adminId },
      update: {
        planId,
        status: "pending", // Keep as pending until payment is confirmed
        startDate,
        endDate,
        razorpayOrderId: subscription.id,
        razorpayPaymentId: null, // Reset payment ID when creating a new subscription
      },
      create: {
        adminId,
        planId,
        status: "pending", // Keep as pending until payment is confirmed
        startDate,
        endDate,
        razorpayOrderId: subscription.id,
      },
      select: {
        id: true,
      },
    });
    console.log("Subscription stored in DB as pending:", subInDb.id);

    // Update admin with subscription ID ONLY (but don't update limits yet)
    await prisma.admin.update({
      where: { id: adminId },
      data: {
        subscriptionId: subInDb.id,
        // Don't update any limits here - admin stays on free plan until payment is confirmed
      },
    });

    // Return success response with payment link
    return {
      success: true,
      subscriptionId: subInDb.id,
      link: subscription.short_url,
    };
  } catch (error: any) {
    console.error("Subscription creation error:", error);
    return {
      success: false,
      error: error.message || "Failed to create subscription",
    };
  }
};

/**
 * Cancel an existing subscription
 */
export const cancelSubscriptionService = async (subscriptionId: string) => {
  try {
    // Find the subscription in our database
    const subscription = await prisma.subscription.findFirst({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error(`Subscription not found`);
    }

    // If there's a Razorpay ID, cancel subscription in Razorpay
    if (subscription.razorpayOrderId) {
      try {
        // Cancel subscription in Razorpay
        const response = await razorpay.subscriptions.cancel(
          subscription.razorpayOrderId
        );
        console.log("Subscription cancelled in Razorpay:", response);

        if (response.status !== "cancelled") {
          throw new Error("Failed to cancel subscription in payment gateway");
        }
      } catch (razorpayError) {
        console.error("Error cancelling Razorpay subscription:", razorpayError);
        // Continue with cleanup even if Razorpay call fails
      }
    }

    // Update subscription status in database
    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: "cancelled" },
    });

    // Reset admin to free plan
    await migrateToFreePlan(subscription.adminId);

    console.log(
      "Subscription status updated in database:",
      updatedSubscription
    );

    return {
      success: true,
      message: "Subscription cancelled successfully",
    };
  } catch (error: any) {
    console.error("Error cancelling subscription:", error);
    return {
      success: false,
      error: error.message || "Failed to cancel subscription",
    };
  }
};

/**
 * Resets an admin account to free plan limits and creates a new free plan subscription
 */
async function migrateToFreePlan(adminId: string) {
  const freePlan = PricingPlans.find((p) => p.id === "free");
  if (!freePlan) {
    throw new Error("Free plan configuration not found");
  }

  // Calculate start and end dates for free subscription
  const startDate = new Date();
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 100); // Set a very long expiration for free plan

  try {
    // Create or update to a free subscription
    const freeSubscription = await prisma.subscription.upsert({
      where: { adminId },
      update: {
        planId: "free",
        status: "active",
        startDate,
        endDate,
        razorpayOrderId: null,
        razorpayPaymentId: null,
      },
      create: {
        adminId,
        planId: "free",
        status: "active",
        startDate,
        endDate,
      },
    });

    // Update admin with free plan limits and the new subscription
    await prisma.admin.update({
      where: { id: adminId },
      data: {
        subscriptionId: freeSubscription.id,
        remainingProjectLimit: freePlan.projectLimit,
        remainginEmployeeLimit: freePlan.employeeLimit, // Fixed typo
        remainingDocumentLimit: freePlan.documentLimit,
        remainingResearchLimit: freePlan.researchLimit,
        dailyResearchLimit: getPlanDailyResearchLimit("free"),
        lastLimitResetDate: new Date(),
      },
    });

    console.log(`Admin ${adminId} migrated to free plan successfully`);
  } catch (error) {
    console.error("Error migrating to free plan:", error);
    throw error;
  }
}

/**
 * Processes webhook events from Razorpay
 */
export const webhookService = async (
  body: any,
  signatureHeader: string | string[] | undefined
) => {
  try {
    // Validate signature
    const signature = Array.isArray(signatureHeader)
      ? signatureHeader[0]
      : signatureHeader || "";

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Missing RAZORPAY_WEBHOOK_SECRET environment variable");
      return { success: false, error: "Configuration error" };
    }

    // Validate webhook signature
    const isValidSignature = validateWebhookSignature(
      JSON.stringify(body),
      signature,
      webhookSecret
    );

    if (!isValidSignature) {
      console.error("Invalid webhook signature");
      return { success: false, error: "Invalid signature" };
    }

    // Extract event type and handle accordingly
    const event = body.event;
    console.log(`Processing webhook event: ${event}`);

    switch (event) {
      case "payment.captured":
        return await handlePaymentCaptured(body);
      case "subscription.activated":
        return await handleSubscriptionActivated(body);
      case "subscription.cancelled":
        return await handleSubscriptionCancelled(body);
      default:
        console.log(`Unhandled event type: ${event}`);
        return {
          success: true,
          message: "Webhook received but no action taken",
        };
    }
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
};

/**
 * Handles payment.captured webhook event
 * This is the critical event where we apply the paid plan benefits
 * Until this event is received, admin remains on free plan limits
 */
async function handlePaymentCaptured(body: any) {
  try {
    // Extract payment details
    const paymentEntity = body.payload.payment.entity;
    const paymentId = paymentEntity.id;
    const subscriptionId = paymentEntity.subscription_id;

    if (!subscriptionId) {
      console.error("No subscription ID found in payment entity");
      return {
        success: false,
        error: "Payment not associated with subscription",
      };
    }

    // Find the subscription in our database
    const subscription = await prisma.subscription.findFirst({
      where: { razorpayOrderId: subscriptionId },
    });

    if (!subscription) {
      throw new Error(
        `Subscription not found for Razorpay ID: ${subscriptionId}`
      );
    }

    // Verify the subscription is for a paid plan (not free)
    if (subscription.planId === "free") {
      console.log("Payment received for free plan - ignoring");
      return {
        success: true,
        message: "Free plan does not require payment processing",
      };
    }

    // Get plan details to make sure it's valid before updating anything
    const plan = PricingPlans.find((p) => p.id === subscription.planId);
    if (!plan) {
      throw new Error(`Plan not found: ${subscription.planId}`);
    }

    // Update subscription with payment ID and mark as active
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        razorpayPaymentId: paymentId,
        status: "active", // Now set to active since payment confirmed
      },
    });

    // CRITICAL: Update admin with paid plan limits only after payment is captured
    // Before this point, admin remains on free plan limits
    const admin = await updateAdminLimits(
      subscription.adminId,
      plan,
      subscription.id
    );

    console.log(
      `Successfully upgraded admin ${subscription.adminId} to ${plan.id} plan after payment confirmation`
    );

    return {
      success: true,
      subscription_id: subscription.id,
      razorpay_subscription_id: subscriptionId,
      payment_id: paymentId,
      status: "active",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  } catch (error: any) {
    console.error("Error processing payment captured event:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Handles subscription.activated webhook event
 * IMPORTANT: We don't apply plan limits here - admin stays on free plan
 * until payment.captured event is received
 */
async function handleSubscriptionActivated(body: any) {
  try {
    const subscriptionEntity = body.payload.subscription.entity;
    const subscriptionId = subscriptionEntity.id;

    // Find the subscription in our database
    const subscription = await prisma.subscription.findFirst({
      where: { razorpayOrderId: subscriptionId },
    });

    if (!subscription) {
      console.log(`Subscription not found: ${subscriptionId}`);
      return { success: false, error: "Subscription not found" };
    }

    // Free plan subscriptions are already active
    if (subscription.planId === "free") {
      return {
        success: true,
        message: "Free plan subscription already active",
      };
    }

    // Only update the subscription table status to indicate Razorpay activated it
    // BUT don't update admin limits yet - only payment.captured should do that
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "pending_payment", // Still waiting for payment confirmation
      },
    });

    console.log(
      `Subscription ${subscription.id} activated in Razorpay, waiting for payment confirmation`
    );

    // Get the admin to ensure they still have free plan limits while waiting
    const admin = await prisma.admin.findUnique({
      where: { id: subscription.adminId },
    });

    if (admin) {
      // Double-check admin is still on free plan limits while waiting for payment
      const freePlan = PricingPlans.find((p) => p.id === "free");
      if (freePlan) {
        // Verify admin has appropriate free plan limits while waiting
        const needsUpdate =
          admin.remainingProjectLimit > freePlan.projectLimit ||
          admin.remainginEmployeeLimit > freePlan.employeeLimit ||
          admin.remainingDocumentLimit > freePlan.documentLimit ||
          admin.remainingResearchLimit > freePlan.researchLimit ||
          admin.dailyResearchLimit > getPlanDailyResearchLimit("free");

        if (needsUpdate) {
          console.log(
            `Resetting admin ${admin.id} back to free plan limits while waiting for payment`
          );
          await prisma.admin.update({
            where: { id: admin.id },
            data: {
              remainingProjectLimit: freePlan.projectLimit,
              remainginEmployeeLimit: freePlan.employeeLimit,
              remainingDocumentLimit: freePlan.documentLimit,
              remainingResearchLimit: freePlan.researchLimit,
              dailyResearchLimit: getPlanDailyResearchLimit("free"),
            },
          });
        }
      }
    }

    return {
      success: true,
      message:
        "Subscription activated in Razorpay, waiting for payment confirmation",
    };
  } catch (error: any) {
    console.error("Error processing subscription activated event:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Handles subscription.cancelled webhook event
 */
async function handleSubscriptionCancelled(body: any) {
  try {
    const subscriptionEntity = body.payload.subscription.entity;
    const subscriptionId = subscriptionEntity.id;

    // Find the subscription in our database
    const subscription = await prisma.subscription.findFirst({
      where: { razorpayOrderId: subscriptionId },
    });

    if (!subscription) {
      console.log(`Subscription not found: ${subscriptionId}`);
      return { success: false, error: "Subscription not found" };
    }

    // Update subscription status to cancelled
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "cancelled" },
    });

    // Migrate admin to free plan
    await migrateToFreePlan(subscription.adminId);

    return { success: true, message: "Subscription cancelled" };
  } catch (error: any) {
    console.error("Error processing subscription cancelled event:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Updates admin account with new plan limits
 * Called ONLY after payment is successfully captured for paid plans
 */
async function updateAdminLimits(
  adminId: string,
  plan: Plan,
  subscriptionId: string
) {
  try {
    // Double check this is a paid plan with a valid subscription
    if (plan.id !== "free") {
      // Verify subscription is in the correct state before applying limits
      const subscription = await prisma.subscription.findFirst({
        where: { id: subscriptionId },
      });

      if (!subscription || subscription.status !== "active") {
        console.error(
          `Cannot update admin limits: subscription ${subscriptionId} is not active`
        );
        throw new Error(
          "Cannot apply premium plan limits to inactive subscription"
        );
      }
    }

    // Calculate daily research limit based on plan type
    const dailyResearchLimit = getPlanDailyResearchLimit(plan.id);

    // Update admin with new limits
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: {
        subscriptionId,
        remainingProjectLimit: plan.projectLimit,
        remainginEmployeeLimit: plan.employeeLimit, // Fixed typo
        remainingDocumentLimit: plan.documentLimit,
        remainingResearchLimit: plan.researchLimit,
        dailyResearchLimit,
        lastLimitResetDate: new Date(),
      },
    });

    console.log(
      `Successfully updated admin ${adminId} with new limits from ${plan.id} plan`
    );

    // Log the new limits for auditing
    console.log(`New limits for admin ${adminId}:`, {
      plan: plan.id,
      projectLimit: plan.projectLimit,
      employeeLimit: plan.employeeLimit,
      documentLimit: plan.documentLimit,
      researchLimit: plan.researchLimit,
      dailyResearchLimit,
    });

    return updatedAdmin;
  } catch (error) {
    console.error(`Failed to update admin ${adminId} limits:`, error);
    throw error;
  }
}

/**
 * Gets daily research limit based on the plan
 */
function getPlanDailyResearchLimit(planId: string): number {
  switch (planId) {
    case "free":
      return 3;
    case "pro":
      return 1000; // High number for "unlimited"
    case "enterprise":
      return 5000; // Higher number for enterprise
    default:
      return 3; // Default to lowest tier
  }
}
