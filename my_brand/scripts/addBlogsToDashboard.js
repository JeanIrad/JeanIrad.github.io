document.addEventListener("DOMContentLoaded", function () {
  const blogsContainer = document.querySelector(".blogs");
  const deletePopup = document.querySelector(".delete__popup");
  const deleteMsg = document.querySelector(".delete__popup p");
  const deleteBtns = document.querySelectorAll(".delete__popup button");
  const deleteIcons = document.querySelectorAll("#deleteIcon");
  const editIcons = document.querySelectorAll("#editIcon");
  // const blogsCollection = document.querySelectorAll(".blog");

  async function fetchData(data) {
    try {
      const response = await fetch(
        `https://jadoiradukunda.onrender.com/api/blogs/`
      );
      const { data } = await response.json();
      data.length <= 0
        ? (blogsContainer.innerHTML =
            "<h2>Please create Blog to view the list</h2>")
        : (blogsContainer.innerHTML = "");
      data.forEach((blog, index) => {
        const blog_container = document.createElement("div");
        blog_container.classList.add("blog");
        blog_container.innerHTML = `
          <span>0${index + 1}</span> <span>${
          blog.title
        }</span> <a href="update_blog.html?id=${
          blog._id
        }"><span role="button" id="editIcon" data-id="${blog._id}"><i
          class="fa-solid fa-pen"></i></span></a><span role="button" id="deleteIcon" data-id="${
            blog._id
          }"><i
          class="fa-solid fa-trash"></i></span>`;
        blogsContainer.appendChild(blog_container);
        deleteBlog();
      });
    } catch (err) {
      console.log("error fetching blogs", err);
      throw err;
    }
  }
  fetchData();
  const deleteBlog = async () => {
    const blogsCollection = document.querySelectorAll(".blog");

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjMxZWM2Mjc1MDM5YzEzMjhkODI5MSIsImlhdCI6MTcxMDg2OTc3MCwiZXhwIjoxNzExNzMzNzcwfQ.k2KslWT-ZkiPxm417bzbXvIhPeBYdhlP0MjrNq2TZQY";
    console.log(deleteIcons);
    blogsCollection.forEach((blog) => {
      blog.addEventListener("click", function (event) {
        if (event.target.classList.contains("fa-trash")) {
          const deleteId = assignBlogId(event);
          deleteMsg.textContent += ` ${blog.title}?`;
          deletePopup.style.display = "block";
          deleteBtns.forEach((btn) => {
            btn.onclick = function (e) {
              if (this.textContent === "Yes") {
                //   data = blogs.filter(
                //     (blog) => blog.id !== parseInt(deleteId)
                //   );
                //   blog_container.remove();
                //   localStorage.setItem("blogs", JSON.stringify(blogs));
                //   displayBlogs();
                deletePopup.style.display = "none";
                return;
              } else {
                deletePopup.style.display = "none";
                return;
              }
            };
          });
          const deleteResponse = fetch(
            `https://jadoiradukunda.onrender.com/api/blogs/${deleteId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = deleteResponse.then((data) => {
            console.log(data);
            return data;
          });
          console.log(result);
        }
      });
    });
  };
  const assignBlogId = (e) => {
    return e.target.parentElement.dataset.id;
  };
});
