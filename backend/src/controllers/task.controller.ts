import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  updateTask,
} from "../services/task.service";
export const createTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    var { name, description, tag, status, priority, projectId, ownerId } =
      req.body;

    if (!name || !description || !tag || !status || !priority || !projectId) {
      throw new Error(
        "Task name, description, tag, status, priority and projectId are required"
      );
    }
    const task = await createTask(
      projectId,      
      name,
      description,
      tag,
      status,
      priority,
      ownerId
    );
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getTasksController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await getTasks(req.params.ownerId);
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (
      req.body.name == null ||
      req.body.description == null ||
      req.body.tag == null ||
      req.body.status == null ||
      req.body.priority == null ||
      req.body.ownerId == null
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid input data",
        error: "Invalid input data",
      });
    }

    const task = await updateTask(
      req.params.taskId,
      req.body.name ?? "",
      req.body.description ?? "",
      req.body.tag ?? "",
      req.body.status ?? "",
      req.body.priority ?? "",
      req.body.ownerId ?? ""
    );
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSingleTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await getSingleTask(req.params.taskId);
    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteTask(req.params.taskId);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
