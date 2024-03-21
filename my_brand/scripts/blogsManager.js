export default class BlogManager {
  static createBlog = async (blog, token) => {
    const response = await fetch(
      // "https://jadoiradukunda.onrender.com/api/blogs",
      "http://localhost:3000/api/blogs",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: blog,
      }
    );
    return response;
  };
}
