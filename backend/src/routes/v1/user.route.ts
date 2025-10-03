import { Router, Request, Response } from "express";
import {
  createAdminFun,
  getUserById,
  loginAdmin,
  logoutAdmin,
  refreshToken,
} from "../../controllers/user.controller";
import { asyncHandler } from "../../utils/route_wrapper";
import { authenticate } from "../../middlewares/auth_middleware";

const userRouter = Router();

userRouter.post("/validate", asyncHandler(createAdminFun));
userRouter.get("/:id", authenticate, asyncHandler(getUserById));
userRouter.post("/login", asyncHandler(loginAdmin));
userRouter.post("/refresh-token", asyncHandler(refreshToken));
userRouter.post("/logout", asyncHandler(logoutAdmin));
export default userRouter;
