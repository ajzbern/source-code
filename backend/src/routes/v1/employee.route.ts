import e, { Router } from "express";

import {
  addCommentToTaskController,
  addProjectToEmployeeController,
  addTaskToEmployeeController,
  createEmployeeController,
  deleteEmployeeController,
  getEmployeeDashboardDataFun,
  getEmployeesController,
  getSingleEmployeeController,
  loginEmployee,
  removeProjectFromEmployeeController,
  removeTaskFromEmployeeController,
  resetPasswordController,
  updateEmployeeController,
} from "../../controllers/employee.controller";
import { asyncHandler } from "../../utils/route_wrapper";
import { verifyToken } from "../../middlewares/auth_middleware";

const employeeRouter = Router();

employeeRouter.post("/login", asyncHandler(loginEmployee));

employeeRouter.post("/create", asyncHandler(createEmployeeController));

employeeRouter.get("/all/:employerId", asyncHandler(getEmployeesController));

employeeRouter.get(
  "/dashboard/:empolyeeId",
  verifyToken,
  asyncHandler(getEmployeeDashboardDataFun)
);

employeeRouter.post(
  "/add-comment",
  verifyToken,
  asyncHandler(addCommentToTaskController)
);

employeeRouter.get("/:employeeId", asyncHandler(getSingleEmployeeController));

employeeRouter.put("/:employeeId", asyncHandler(updateEmployeeController));

employeeRouter.delete("/:employeeId", asyncHandler(deleteEmployeeController));

employeeRouter.post(
  "/add-project",
  asyncHandler(addProjectToEmployeeController)
);

employeeRouter.post(
  "/remove-project",
  asyncHandler(removeProjectFromEmployeeController)
);

employeeRouter.post("/add-task", asyncHandler(addTaskToEmployeeController));

employeeRouter.post(
  "/remove-task",
  asyncHandler(removeTaskFromEmployeeController)
);

employeeRouter.post("/reset-password", asyncHandler(resetPasswordController));

export default employeeRouter;
