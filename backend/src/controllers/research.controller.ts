import { searchInternet } from "../services/research.service";
import type { Request, Response } from "express";

export const researchController = async (req: Request, res: Response) => {
  try {
    const { projectDescription, adminId } = req.body;
    const results = await searchInternet(projectDescription, adminId);
    res.status(200).json({
      success: true,
      message: "Research completed successfully",
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
