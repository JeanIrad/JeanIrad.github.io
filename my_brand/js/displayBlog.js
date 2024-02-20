let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
document.addEventListener("DOMContentLoaded", () => {
  // Displaying blogs on Dashboard
  const dashboardBlogContainer = document.querySelector(".blogs");
  blogs.length <= 0
    ? (dashboardBlogContainer.innerHTML =
        "<h2>Please create Blog to view the list</h2>")
    : (dashboardBlogContainer.innerHTML = "");
  const displayBlogs = () => {
    blogs.forEach(({ title, id, isUpdated }, index) => {
      console.log(id);
      const blog = document.createElement("div");

      blog.classList.add("blog");
      blog.innerHTML = `<span>0${
        index + 1
      }</span> <span>${title}</span> <span role="button" data-id="${id}"><i
          class="fa-solid fa-pen" ></i></span><span role="button" data-id="${id}"><i
          class="fa-solid fa-trash" ></i></span>`;
      dashboardBlogContainer.appendChild(blog);
    });
  };
  displayBlogs();

  // deleting blog
  const deletePopup = document.querySelector(".delete__popup");
  const deleteMsg = document.querySelector(".delete__popup p");
  const deleteBtns = document.querySelectorAll(".delete__popup button");
  console.log(deleteMsg.textContent);
  const deleteBlog = () => {
    const blogCollection = document.querySelectorAll(".blog");
    blogCollection.forEach(function (blogDiv) {
      blogDiv.style.transition = "all 0.5s ease-in-out";
      blogDiv.onclick = (e) => {
        if (e.target.classList.contains("fa-trash")) {
          const deleteId = assignBlogId(e);
          const blogToDelete = blogs.find(
            (blog) => blog.id === parseInt(deleteId)
          );

          deleteMsg.textContent += ` ${blogToDelete.title}?`;
          deletePopup.style.display = "block";
          deleteBtns.forEach((btn) => {
            btn.onclick = function (e) {
              if (this.textContent === "Yes") {
                blogs = blogs.filter((blog) => blog.id !== parseInt(deleteId));
                blogDiv.remove();
                localStorage.setItem("blogs", JSON.stringify(blogs));
                displayBlogs();
                deletePopup.style.display = "none";
              } else {
                deletePopup.style.display = "none";
                return;
              }
            };
          });
        } else if (e.target.classList.contains("fa-pen")) {
          const editId = assignBlogId(e);
          location.href = `update_blog.html?id=${editId}`;
        }
      };
    });
  };
  deleteBlog();

  const assignBlogId = (e) => {
    return e.target.parentElement.dataset.id;
  };
});
