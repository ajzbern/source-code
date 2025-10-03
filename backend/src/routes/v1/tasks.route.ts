import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getSingleTaskController,
  getTasksController,
  updateTaskController,
} from "../../controllers/task.controller";
import { asyncHandler } from "../../utils/route_wrapper";

const taskRouter = Router();

taskRouter.post("/create", asyncHandler(createTaskController));

taskRouter.get("/all/:ownerId", asyncHandler(getTasksController));

taskRouter.patch("/:taskId", asyncHandler(updateTaskController));

taskRouter.get("/:taskId", asyncHandler(getSingleTaskController));

taskRouter.delete("/:taskId", asyncHandler(deleteTaskController));

export default taskRouter;
