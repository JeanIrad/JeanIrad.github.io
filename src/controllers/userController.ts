import { NextFunction, Response, Request } from "express";
import catchAsync from "./../utils/catchAsync";
import User from "../models/userModel";
import AppError from "../utils/appError";

export default class UserController {
  static getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await User.find({}, { __v: false });
      if (!users) {
        return next(new AppError("No Users found", 404));
      }
      res.status(200).json({
        status: "success",
        size: users.length,
        users,
      });
    }
  );

  static getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        return next(new AppError("No User found with that id", 404));
      }
      res.status(200).json({
        status: "success",
        user,
      });
    }
  );
}
