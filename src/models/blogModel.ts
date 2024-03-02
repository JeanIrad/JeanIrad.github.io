import { model, Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "A blog must have a title"],
    min: 2,
  },
  description: {
    type: String,
    required: [true, "A blog must have a description"],
  },
  image: String,
});
const Blog = model("Blog", blogSchema);
export default Blog;
