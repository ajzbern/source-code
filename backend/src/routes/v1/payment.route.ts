import { Router } from "express";
import { authenticate } from "../../middlewares/auth_middleware";
import { asyncHandler } from "../../utils/route_wrapper";

import {
  cancelSubscriptionController,
  createOrderController,
  webhook,
} from "../../controllers/payment.controller";

const paymentRouter = Router();

paymentRouter.post("/order", authenticate, asyncHandler(createOrderController));

paymentRouter.post(
  "/cancel-subscription",
  authenticate,
  asyncHandler(cancelSubscriptionController)
);

paymentRouter.post("/webhook", asyncHandler(webhook));

export default paymentRouter;
