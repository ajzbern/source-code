// Your validateRequest middleware is likely returning a Promise<Response> instead of void or Promise<void>
// which Express expects for middleware functions

// Here's how you should modify your validateRequest middleware:
import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod"; // Assuming you're using Zod for validation

export default function validateRequest(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      // If validation passes, call next() instead of returning
      next();
    } catch (error) {
      // If validation fails, send error response
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error,
      });
      // Don't return the response
    }
  };
}
