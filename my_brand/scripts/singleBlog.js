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
        console.log(typeof createdAt);
        const createdTime = new Date(createdAt);
        const timeDifferenceSecs = Math.floor(
          (new Date() - createdTime) / 1000
        );
        const timeDifferenceMins = timeDifferenceSecs / 60;
        const timeDifferenceHours = timeDifferenceSecs / 3600;
        const timeDifferenceDays = timeDifferenceSecs / 86400;
        // rendering time
        timeDifferenceSecs < 60
          ? (createdAtContainer.textContent += ` ${Math.round(
              timeDifferenceSecs
            )} secs ago`)
          : timeDifferenceSecs < 3600
          ? (createdAtContainer.textContent += ` ${Math.round(
              timeDifferenceMins
            )} mins ago`)
          : timeDifferenceSecs < 86400
          ? (createdAtContainer.textContent += ` ${Math.round(
              timeDifferenceHours
            )} hours ago`)
          : (createdAtContainer.textContent += ` ${Math.round(
              timeDifferenceDays
            )} days ago`);
        // console.log(blog);
        titleBlog.textContent = title;
        image.src = imageUrl;
        blogDescription.innerHTML = description;
        authorContainer.textContent += ` ${author.firstName}  ${author.lastName}`;
      }
    } catch (err) {
      console.log("error fetching a blog", err);
    }
  }
  fetchBlogById();
});
