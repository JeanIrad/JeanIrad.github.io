import { Router } from "express";
import UserController from "../controllers/userController";
import AuthoController from "../controllers/authController";
const { getAllUsers, getUser, updateUser, deleteUser } = UserController;
const { signup, login, protectRoutes, checkAdmin } = AuthoController;
const userRouter = Router();

// userRouter.post("/signup", signup);
// userRouter.post("/login", login);
userRouter.route("/").get(protectRoutes, getAllUsers);
userRouter
  .route("/:id")
  .get(protectRoutes, getUser)
  .patch(protectRoutes, checkAdmin, updateUser)
  .delete(protectRoutes, checkAdmin, deleteUser);

export default userRouter;
