import { Request, Response, NextFunction } from "express";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Blog from "../models/blogModel";

export default class BlogController {
  static getAllBlogs = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const blogs = await Blog.find({}, { __v: false });
      res.status(200).json({
        status: "success",
        size: blogs.length,
        data: blogs,
      });
    }
  );

  static createBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // const { title, description, image } = req.body;
      const blog = await Blog.create(req.body);
      res.status(200).json({
        status: "success",
        data: blog,
      });
    }
  );
  static updateBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const blog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!blog) {
        return next(new AppError(`No Blog Found with id ${id}`, 404));
      }
      res.status(201).json({
        status: "success",
        data: blog,
      });
    }
  );
  static deleteBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      // console.log(blog);
      if (!blog) {
        return next(
          new AppError(`No blog found with Id ${req.params.id}`, 404)
        );
      }
      res.status(200).json({
        status: "success",
        message: "deleted",
      });
    }
  );
  static getBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const blog = await Blog.findById(id);
      if (!blog) {
        return next(new AppError(`No blog found with the id ${id}`, 404));
      }
      res.status(200).json({
        status: "success",
        blog,
      });
    }
  );
}
