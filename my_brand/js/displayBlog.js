let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
document.addEventListener("DOMContentLoaded", () => {
  // Displaying blogs
  const dashboardBlogContainer = document.querySelector(".blogs");
  const displayBlogs = () => {
    blogs.forEach(({ title, id, isUpdated }, index) => {
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

  const deleteBlog = () => {
    const blogCollection = document.querySelectorAll(".blog");
    // console.log(blogCollection);
    blogCollection.forEach(function (blogDiv) {
      blogDiv.onclick = (e) => {
        if (e.target.classList.contains("fa-trash")) {
          // const deleteId = e.target.parentElement.dataset.id;
          const deleteId = assignBlogId(e);
          const blogToDelete = blogs.find(
            (blog) => blog.id === parseInt(deleteId)
          );
          const confirmDelete = confirm(
            `Are you sure you want to delete ${blogToDelete.title}?`
          );
          if (confirmDelete) {
            let removeBlog = e.target.parentElement.parentElement;
            removeBlog.remove();
            blogs = blogs.filter((blog) => blog.id !== parseInt(deleteId));
            localStorage.setItem("blogs", JSON.stringify(blogs));
            displayBlogs();
          } else {
            return;
          }
        } else if (e.target.classList.contains("fa-pen")) {
          const editId = assignBlogId(e);
          location.href = `update_blog.html?id=${editId}`;
        }
      };
    });
  };
  deleteBlog();

  // edit blog

  const assignBlogId = (e) => {
    return e.target.parentElement.dataset.id;
  };
});
