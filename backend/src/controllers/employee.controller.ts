import {
  addCommentToTask,
  addProjectToEmployee,
  addTaskToEmployee,
  createEmployee,
  deleteEmployee,
  employeeLogin,
  getEmployeeDashboard,
  getEmployees,
  getSingleEmployee,
  removeProjectFromEmployee,
  removeTaskFromEmployee,
  resetPassword,
  updateEmployee,
} from "../services/employee.service";
import {
  CreateEmployeeSchema,
  LoginSchema,
  UpdateEmployeeSchema,
} from "../types";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Environment variables should be properly set up
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";
const JWT_EXPIRES_IN = "1h";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const generateTokens = (user: { id: string; email: string; role: string }) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

export const loginEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body
    const validatedData = LoginSchema.parse(req.body);
    const { email, password } = validatedData;

    const employee = await employeeLogin(email, password);

    if (!employee) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({
      id: employee.id,
      email: employee.email,
      role: "employee",
    });

    res.status(200).json({
      success: true,
      message: "Employee logged in successfully",
      data: {
        employee: {
          id: employee.id,
          name: employee.name,
          email: employee.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid credentials") {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    } else if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({
        success: false,
        message: "Invalid input data",
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
};

export const createEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = CreateEmployeeSchema.parse(req.body);
    var employee = await createEmployee(
      validatedData.name,
      validatedData.email,
      validatedData.contact ?? "",
      validatedData.role,
      validatedData.skills,
      validatedData.status,
      validatedData.location ?? "",
      validatedData.employerId ?? "",
      validatedData.department,
      validatedData.githubUsername ?? ""
    );
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getEmployeesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    var employees = await getEmployees(req.params.employerId);
    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSingleEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employee = await getSingleEmployee(req.params.employeeId);
    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getEmployeeDashboardDataFun = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    var employees = await getEmployeeDashboard(req.params.empolyeeId);
    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const addCommentToTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await addCommentToTask(
      req.body.taskId,
      req.body.comment,
      req.body.commentorId
    );
    res.status(200).json({
      success: true,
      message: "Comment added to task successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = UpdateEmployeeSchema.parse(req.body);
    const employee = await updateEmployee(
      req.params.employeeId,
      validatedData.name ?? "",
      validatedData.email ?? "",
      validatedData.contact ?? "",
      validatedData.role ?? "",
      validatedData.skills ?? [],
      validatedData.status ?? "",
      validatedData.location ?? "",
      validatedData.department ?? ""
    );
    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteEmployee(req.params.employeeId);
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const addProjectToEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await addProjectToEmployee(req.body.employeeId, req.body.projectId);
    res.status(200).json({
      success: true,
      message: "Project added to employee successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const removeProjectFromEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await removeProjectFromEmployee(req.body.employeeId, req.body.projectId);
    res.status(200).json({
      success: true,
      message: "Project removed from employee successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const addTaskToEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await addTaskToEmployee(req.body.employeeId, req.body.taskId);
    res.status(200).json({
      success: true,
      message: "Task added to employee successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { old_password, new_password, email } = req.body;
    console.log("old_password", old_password);
    console.log("new_password", new_password);
    console.log("email", email);
    // Validate request body
    if (!old_password) {
      res.status(400).json({
        success: false,
        message: "old password is required",
      });
      return;
    }

    if (!new_password) {
      res.status(400).json({
        success: false,
        message: "new password is required",
      });
      return;
    }

    if (!email) {
      res.status(400).json({
        success: false,
        message: "employee id is required",
      });
      return;
    }

    const psd = await resetPassword(email, old_password, new_password);
    if (!psd) {
      res.status(401).json({
        success: false,
        message: "Invalid old password",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const removeTaskFromEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await removeTaskFromEmployee(req.body.employeeId, req.body.taskId);
    res.status(200).json({
      success: true,
      message: "Task removed from employee successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
