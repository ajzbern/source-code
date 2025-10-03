import type { Request, Response } from "express";
import {
  cancelSubscriptionService,
  createSubscriptionService,
  webhookService,
} from "../services/payment.service";

export const createOrderController = async (req: Request, res: Response) => {
  const { amount, currency, planId, billingCycle, notes, adminId } = req.body;
  console.log("Request body:", req.body);
  if (!amount) {
    res.status(400).json({ error: "Amount is required" });
    return;
  }
  if (!currency) {
    res.status(400).json({ error: "Currency is required" });
    return;
  }
  if (!planId) {
    res.status(400).json({ error: "Plan ID is required" });
    return;
  }
  if (!billingCycle) {
    res.status(400).json({ error: "Billing cycle is required" });
    return;
  }
  if (!notes) {
    res.status(400).json({ error: "Notes are required" });
    return;
  }
  if (!adminId) {
    res.status(400).json({ error: "Admin ID is required" });
    return;
  }
  const response = await createSubscriptionService({
    planId,
    billingCycle,
    adminId,
    notes,
  });
  if (!response) {
    res.status(500).json({ error: "Failed to create order" });
    return;
  }
  res.status(200).json({
    success: true,
    message: "Order created successfully",
    data: response,
  });
};

export const cancelSubscriptionController = async (
  req: Request,
  res: Response
) => {
  const { subscriptionId } = req.body;
  if (!subscriptionId) {
    res.status(400).json({ error: "Subscription ID is required" });
    return;
  }
  const response = await cancelSubscriptionService(subscriptionId);
  if (!response) {
    res.status(500).json({ error: "Failed to cancel subscription" });
    return;
  }
  res.status(200).json({
    success: true,
    message: "Subscription cancelled successfully",
    data: response,
  });
};

export const webhook = async (req: Request, res: Response) => {
  const signature =
    req.headers["X-Razorpay-Signature"] || req.headers["x-razorpay-signature"];
  const parsedBody = req.body;

  if (!signature) {
    return res.status(400).json({ error: "Signature is required" });
  }

  if (!parsedBody) {
    return res.status(400).json({ error: "Request body is required" });
  }

  try {
    const response = await webhookService(req.body, signature);
    if (response instanceof Error) {
      return res.status(400).json({ error: response.message });
    }
    if (!response) {
      return res.status(500).json({ error: "Failed to process webhook" });
    }
    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
      data: response,
    });
  } catch (error) {
    console.error("Webhook controller error:", error);
    return res.status(500).json({
      error: "Failed to process webhook",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};
