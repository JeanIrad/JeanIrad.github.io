import express from "express";
import morgan from "morgan";

import blogRouter from "./routers/blogRouter";
import HandleInvalidUrl from "./utils/invalidUrl";
import GlobalError from "./controllers/errorController";
import AppError from "./utils/appError";
import userRouter from "./routers/userRouter";

const { handleInvalidUrl } = HandleInvalidUrl;
const { sendErrorDev } = GlobalError;

const app = express();
app.use(express.json());

app.use(morgan("dev"));
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("*", handleInvalidUrl);
app.use(sendErrorDev);
export default app;
