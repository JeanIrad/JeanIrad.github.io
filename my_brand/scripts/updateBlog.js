document.addEventListener("DOMContentLoaded", function () {
  const updateBlogForm = document.getElementById("updateBlogForm");
  const imageFile = document.getElementById("blogImage");
  const blogDescription = document.getElementById("blogContent");
  const blogTitle = document.getElementById("blogTitle");
  const blogIdSearch = new URLSearchParams(window.location.search);
  const token = JSON.parse(localStorage.getItem("token"));
  const blogId = blogIdSearch.get("id");
  if (!blogId) throw new Error("No Id");
  const updateBlogFunction = async () => {
    try {
      const response = await fetch(
        `https://jadoiradukunda.onrender.com/api/blogs/${blogId}`
      );
      console.log(response.ok);
      if (response.ok) {
        const { blog } = await response.json();
        const { description, title } = blog;
        (blogTitle.value = title), (blogDescription.value = description);
        updateBlogForm.addEventListener("submit", async function (submitEvent) {
          submitEvent.preventDefault();
          console.log(blogTitle.value);
          const newblog = new FormData();
          newblog.append("title", blogTitle.value);
          newblog.append("description", blogDescription.value);
          newblog.append("image", imageFile.files[0]);

          const response2 = await fetch(
            `https://jadoiradukunda.onrender.com/api/blogs/${blogId}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                // "Content-Type": "multipart/form-data",
              },
              body: newblog,
            }
          );
          console.log(...newblog);
          if (response2.ok) {
            // clear all the inputs
            blogTitle.value = "";
            blogDescription.value = "";
            imageFile.fiels[0] = "";
            console.log(await response2.json());
          } else {
            console.log(await response2.json());
          }
        });
      }
    } catch (err) {
      console.log("err fetching ", err);
      throw err;
    }
  };
  updateBlogFunction();
});
