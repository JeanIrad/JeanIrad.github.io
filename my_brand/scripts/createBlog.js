document.addEventListener("DOMContentLoaded", function () {
  const query = new URLSearchParams(window.location.search);
  // console.log(query.get("isloggedIn"));
  const createBlogForm = document.getElementById("createBlogForm");
  // createBlogForm.addEventListener("submit", async function (event) {
  //   event.preventDefault();
  //   const title = document.getElementById("blogTitle").value;
  //   const description = document.getElementById("blogContent").value;
  //   const image = document.getElementById("blogImage");
  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("image", image.files[0]);
  //   console.log(...formData);
  //   try {
  //     if (!query.get("isloggedIn")) {
  //       throw new Error("You must log in");
  //       return;
  //     } else {
  //       const token =
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjMxZWM2Mjc1MDM5YzEzMjhkODI5MSIsImlhdCI6MTcxMDg2OTc3MCwiZXhwIjoxNzExNzMzNzcwfQ.k2KslWT-ZkiPxm417bzbXvIhPeBYdhlP0MjrNq2TZQY";
  //       const response = await fetch("http://localhost:3000/api/v1/blogs", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       });
  //       console.log(response);
  //       // const data = await response.json();
  //       // console.log(data.body);
  //     }
  //   } catch (err) {
  //     console.log("error creating a blog", err);
  //     throw err;
  //   }
  // });
  class BlogManager {
    static createBlog = async (data, token) => {
      console.log(...formData);
      const response = await fetch(
        "https://jadoiradukunda.onrender.com/api/blogs",
        {
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: data,
        }
      );
      return response;
    };
  }

  createBlogForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("blogTitle").value;
    const description = document.getElementById("blogContent").value;
    const image = document.getElementById("blogImage");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image.files[0]);
    formData.append("author", "65e75566df56c5a914155a88");

    try {
      // console.log(...formData);
      const token = JSON.parse(localStorage.getItem("token")) ?? undefined;
      const response = await fetch("http://localhost:3000/api/blogs", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      console.log(response.ok);
      console.log(await response.json());
    } catch (err) {
      console.log("error ", err);
    }
  });
});
