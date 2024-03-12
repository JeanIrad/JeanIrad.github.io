import express from "express";
import dotenv from "dotenv";

import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config({ path: `${__dirname}/env/config.env` });

import blogRouter from "./routers/blogRouter";
import HandleInvalidUrl from "./utils/invalidUrl";
import GlobalError from "./controllers/errorController";
import userRouter from "./routers/userRouter";
import authRoute from "./routers/authRoutes";
import messageRouter from "./routers/messageRoute";
import UserController from "./controllers/userController";
import skillsRouter from "./routers/skillsRoute";
import portfolioRouter from "./routers/portfolioRoute";
import aboutMeRouter from "./routers/aboutMeRoute";

const { handleInvalidUrl } = HandleInvalidUrl;
const { sendErrorDev } = GlobalError;
const { verifyUserEmail } = UserController;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/:verifyId/verify/:verifyToken", verifyUserEmail);
app.use("/api/v1/messages/", messageRouter);
app.use("/api/v1/skills/", skillsRouter);
app.use("/api/v1/aboutme/", aboutMeRouter);
app.use("/api/v1/portfolio/", portfolioRouter);

app.use("*", handleInvalidUrl);
app.use(sendErrorDev);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`app running on port ${PORT}... `));
export default app;
