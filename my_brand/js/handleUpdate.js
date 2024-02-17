let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

const updateBlogForm = document.getElementById("updateBlogForm");
const blogTitle = document.getElementById("blogTitle");
const blogImage = document.getElementById("blogImage");

const params = new URLSearchParams(window.location.search);
const updateId = +params.get("id");
// console.log(updateId);
let { title, content } = blogs.find(({ id }) => id === updateId);
// console.log(title);
const updateBlog = (title, content, image) => {
  const indexOfBlog = blogs.findIndex((blog) => blog.id === updateId);
  if (indexOfBlog !== -1) {
    blogs[indexOfBlog] = { title, content, image };
  }
};
blogTitle.value = title;
blogContent.value = content;

updateBlogForm.addEventListener("submit", function (e) {
  e.preventDefault();
  updateBlog(
    blogTitle.value,
    blogContent.value,
    URL.createObjectURL(blogImage.files[0])
  );
  localStorage.setItem("blogs", JSON.stringify(blogs));
  blogTitle.value = "";
  blogContent.value = "";
  blogImage.value = "";
});
