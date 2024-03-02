import { Router } from "express";
import UserController from "../controllers/userController";
import AuthoController from "../controllers/authController";
const { getAllUsers } = UserController;
const { signup, login, protectRoutes } = AuthoController;
const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.route("/").get(protectRoutes, getAllUsers);

export default userRouter;
