import { Router } from "express";
import blogController from "../controllers/blogController";

const { getAllBlogs, createBlog, deleteBlog, updateBlog, getBlog } =
  blogController;

const blogRouter = Router();

blogRouter.route("/").get(getAllBlogs).post(createBlog);
blogRouter.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog);

export default blogRouter;
