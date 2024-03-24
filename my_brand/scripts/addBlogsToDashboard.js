document.addEventListener("DOMContentLoaded", function () {
  const blogsContainer = document.querySelector(".blogs");
  const deletePopup = document.querySelector(".delete__popup");
  const deleteMsg = document.querySelector(".delete__popup p");
  const deleteBtns = document.querySelectorAll(".delete__popup button");
  const loader = document.querySelector(".loader_container");
  const popupMessage = document.querySelector(".popup__message");
  const blogNum = document.getElementById("blogNum");
  const token = JSON.parse(localStorage.getItem("token"));
  async function fetchData(data) {
    try {
      blogsContainer.innerHTML =
        '<h1 style="text-align: center; color: #000c24;">Loading blogs...</h1>';
      const blogResponse = await fetch(
        `https://jadoiradukunda.onrender.com/api/blogs/`
      );
      if (blogResponse.ok) {
        const { data, size } = await blogResponse.json();
        size === 0
          ? (blogNum.textContent = "No blog")
          : (blogNum.textContent = size);
        data.length <= 0
          ? (blogsContainer.innerHTML =
              "<h2>Please create Blog to view the list</h2>")
          : (blogsContainer.innerHTML = "");
        data.forEach((blog, index) => {
          const blog_container = document.createElement("div");
          blog_container.classList.add("blog");
          blog_container.innerHTML = `
          <span>0${index + 1}</span> <span>${
            blog.title.length < 30
              ? blog.title
              : blog.title.slice(0, 30) + "..."
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
      }
      // implementing the stats update and avoid code duplication
      const updateStats = async (path, element) => {
        const response = await fetch(
          `https://jadoiradukunda.onrender.com/api/${path}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const { size } = await response.json();
          size === 0
            ? (element.textContent = `No ${path}`)
            : (element.textContent = size);
        }
      };
      // fetching users
      updateStats("users", document.getElementById("userNum"));
      // fetching messages
      updateStats("messages", document.getElementById("messageNum"));
      // fetching comments
      updateStats("comments", document.getElementById("commentNum"));

      // fetching portfolio
      updateStats("portfolio", document.getElementById("portfolioNum"));
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
    blogsCollection.forEach((blog) => {
      blog.addEventListener("click", function (event) {
        if (event.target.classList.contains("fa-trash")) {
          const deleteId = assignBlogId(event);
          deleteMsg.textContent += ` ${blog.title}?`;
          deletePopup.style.display = "block";
          deleteBtns.forEach((btn) => {
            btn.onclick = async function (e) {
              try {
                if (this.textContent === "Yes") {
                  loader.style.display = "flex";
                  const deleteResponse = await fetch(
                    `https://jadoiradukunda.onrender.com/api/blogs/${deleteId}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (deleteResponse.ok) {
                    const { message } = await deleteResponse.json();
                    console.log(message);
                    deletePopup.style.display = "none";
                    loader.style.display = "none";
                    popupMessage.textContent = "blog deleted successfully!";
                    popupMessage.style.color = "green";
                    popupMessage.classList.add("show__popup");
                    setTimeout(function () {
                      popupMessage.classList.remove("show__popup");
                    }, 1500);
                  }
                } else {
                  deletePopup.style.display = "none";

                  return;
                }
              } catch (err) {
                console.log("error deleting a blog", err);
              }
            };
          });
        }
      });
    });
  };
  const assignBlogId = (e) => {
    return e.target.parentElement.dataset.id;
  };
});
