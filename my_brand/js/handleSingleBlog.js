const idParams = new URLSearchParams(window.location.search);
const searchId = +idParams.get("id");
const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

const blog = blogs.find((blog) => blog.id === searchId);
console.log(blog);
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("blog__title");
  const content = document.getElementById("blog__content");
  const image = document.getElementById("blog__image");
  title.textContent = blog.title;
  content.textContent = blog.content;
  image.src = blog.image;
});
