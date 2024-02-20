let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
document.addEventListener("DOMContentLoaded", function () {
  const blogsContainer = document.getElementById("blogs");
  if (blogs) {
    blogs.forEach(({ title, content, image, id }) => {
      const blog = document.createElement("div");
      blog.classList.add("blog__container");
      blog.innerHTML = `<div class="image">
        <img src="${image}" alt="blog Image">
        <h4>${title}</h4>
        <p>${content.length > 50 ? content.slice(0, 51) + "..." : content}</p>
    </div>
    <a href="single_blog.html?id=${id}">read More</a>`;
      blogsContainer.appendChild(blog);
    });
  }
});
