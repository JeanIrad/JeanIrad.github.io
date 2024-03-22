document.addEventListener("DOMContentLoaded", function () {
  const blogsContainer = document.querySelector(".blogs");
  async function fetchData(data) {
    try {
      const response = await fetch(
        `https://jadoiradukunda.onrender.com/api/blogs/`
      );
      const returnedData = await response.json();
      if (response.ok) {
        const { data } = returnedData;
        if (data.length > 0) {
          data.forEach((blog) => {
            const blog_container = document.createElement("div");
            blog_container.classList.add("blog__container");
            blog_container.innerHTML = `
          <div class="image">
          <img src="${blog.imageUrl}" alt="${blog.title.slice(0, 3)}">
          <h4>${blog.title}</h4>
          <p>${blog.description.slice(0, 10)}...</p>
      </div>
      <a href="single_blog.html?id=${blog._id}">read More</a>`;
            blogsContainer.appendChild(blog_container);
          });
        }
      }
    } catch (err) {
      console.log("error fetching blogs", err);
      throw err;
    }
  }
  fetchData();
});
