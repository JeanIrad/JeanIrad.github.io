let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
// creating Blogs

const createBlogForm = document.querySelector("#createBlogForm");
const blogTitle = document.querySelector("#blogTitle");
const blogContent = document.querySelector("#blogContent");
const blogImage = document.querySelector("#blogImage");

createBlogForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const blog = {
    title: blogTitle.value,
    content: blogContent.value,
    image: URL.createObjectURL(blogImage.files[0]),
    id: Date.now(),
  };
  addBlog(blog);
  blogTitle.value = "";
  blogContent.value = "";
  blogImage.value = "";
});
const addBlog = (blog) => {
  blogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
};
