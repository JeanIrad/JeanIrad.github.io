import User from "../models/userModel";
import AppError from "../utils/appError";
import JWT from "../utils/jwt";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
const JWTService = new JWT();

interface loginUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthenticatedRequest extends Request {
  user?: loginUser;
}
const checkLoginPassword = async (
  loginPassword: string,
  registeredPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(loginPassword, registeredPassword);
};
export default class AuthController {
  static signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password, firstName, lastName } = req.body;
      // const user = await User.create({firstName, lastName, email, password})
      const user = await User.findOne({ email });
      if (user)
        return next(
          new AppError(`User with this email: ${email} already exist!`, 400)
        );
      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
      });
      const sendUserData = {
        email: newUser.email,
        firstName: newUser.firstName,
      };
      const token = JWTService.signToken(newUser._id);
      res.status(201).json({
        status: "success",
        token,
        data: sendUserData,
      });
    }
  );

  static login = catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      if (!email || !password)
        return next(new AppError("Please provide email and password", 400));
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await checkLoginPassword(password, user.password)))
        return next(new AppError(`Please provide valid credentials!`, 401));
      const token = JWTService.signToken(user._id);
      req.user = user;
      res.status(200).json({
        status: "success",
        message: "logged in successfully!",
        token,
      });
      console.log(req.user);
    }
  );
  static protectRoutes = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req.headers);
      const authorization = req.headers.authorization;
      if (!authorization) {
        return next(new AppError("you must include authorization", 401));
      }
      const token = authorization.split(" ")[1];
      if (!token) return next(new AppError("Please provide a token", 401));
      const decodedToken = await JWTService.verifyToken(token);
      console.log(decodedToken);
      console.log(JWTService);
      console.log(token);
      next();
    }
  );
}
