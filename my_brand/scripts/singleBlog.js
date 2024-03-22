document.addEventListener("DOMContentLoaded", function () {
  const blogIdSearch = new URLSearchParams(window.location.search);
  const blogDescriptionContainer = document.querySelector(".blog__content");
  const image = document.getElementById("blog__image");
  const titleBlog = document.getElementById("blog__title");
  const blogDescription = document.getElementById("blog__content");
  const authorContainer = document.getElementById("author");
  const createdAtContainer = document.getElementById("createdAt");
  const blogId = blogIdSearch.get("id");
  console.log(blogId);
  if (!blogId) throw new Error("no id:");
  async function fetchBlogById() {
    try {
      const response = await fetch(
        `https://jadoiradukunda.onrender.com/api/blogs/${blogId}`
      );
      console.log(response.ok);
      if (response.ok) {
        const { blog } = await response.json();
        const { author, imageUrl, description, createdAt, title } = blog;
        //   await response.json();
        console.log(blog);
        titleBlog.textContent = title;
        image.src = imageUrl;
        blogDescription.textContent = description;
        createdAtContainer.textContent += ` ${createdAt}`;
        authorContainer.textContent += ` ${author.firstName}  ${author.lastName}`;
      }
    } catch (err) {
      console.log("error fetching a blog", err);
    }
  }
  fetchBlogById();
});
