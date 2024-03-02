import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import AppError from "../utils/appError";

export default class GlobalError {
  static sendErrorDev = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (err.name === "ValidationError") {
      let error = { ...err };
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((el) => el.message)
          .join(" "),
      });
    }
    if (err.name === "Error") {
      return res.status(401).json({
        message: err.message,
      });
    }
    if (err.name === "JsonWebTokenError")
      return res.status(401).json({
        message: `JWT error ${err.message}`,
      });
    console.log(err.name);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      name: err.name,
      err,
    });
  };
}
