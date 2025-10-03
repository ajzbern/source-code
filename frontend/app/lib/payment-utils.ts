
import { revalidatePath } from "next/cache";
import { API_URL } from "./server-config";

interface CreateOrderParams {
  amount: number;
  currency: string;
  planId: string;
  billingCycle: "monthly" | "yearly";
  adminId: string;
  notes: any
}

export async function createRazorpayOrder(params: CreateOrderParams) {
  try {
    const { amount, currency, planId, billingCycle, adminId, notes } = params;
    const response = await fetch(`${API_URL}/payments/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "thisisasdca",
        Authorization: `Authorization ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        planId,
        billingCycle,
        adminId,
        notes,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create order");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
}

export async function verifyPayment(paymentData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Payment verification failed");
    }

    const data = await response.json();

    // Revalidate relevant paths
    revalidatePath("/dashboard");
    revalidatePath("/settings/billing");

    return data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
}
