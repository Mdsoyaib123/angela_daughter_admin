import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

const validateRequest =
  (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          params: req.params,
          query: req.query,
        });

        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error.issues,
          });
        }

        next(error);
      }
    };

export default validateRequest;