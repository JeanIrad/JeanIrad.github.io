/*
        <div class="blog__container">
            <div class="image">
                <img src="./images/mine/blogs/image1.png" alt="blog Image">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis libero vitae harum! Voluptatem,
                    quod voluptates quaerat iste fuga voluptate minus aperiam delectus amet natus placeat laborum est,
                    distinctio iure deserunt!</p>
            </div>
            <a href="single_blog.html">read More</a>
        </div>
        */
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
document.addEventListener("DOMContentLoaded", function () {
  const blogsContainer = document.getElementById("blogs");
  //   console.log(blogsContainer);
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
