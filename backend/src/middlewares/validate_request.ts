import type { Request, Response, NextFunction } from "express";
import { Schema } from "zod"; 

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        error: error instanceof Error ? error.message : "Invalid request data",
      });
    }
  };
};
