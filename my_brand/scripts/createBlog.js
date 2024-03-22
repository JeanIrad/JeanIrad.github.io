document.addEventListener("DOMContentLoaded", function () {
  const query = new URLSearchParams(window.location.search);
  const createBlogForm = document.getElementById("createBlogForm");
  const loader = document.getElementById("loaderContainer");
  const popupMessage = document.querySelector(".popup__message");

  createBlogForm.addEventListener("submit", async function (event) {
    try {
      event.preventDefault();
      if (!query.get("isloggedIn")) {
        throw new Error("You must login first");
        return;
      }
      const title = document.getElementById("blogTitle").value;
      const description = document.getElementById("blogContent").value;
      const image = document.getElementById("blogImage");
      const user = JSON.parse(localStorage.getItem("user")) || {};
      if (!user) throw new Error("No user found!");
      const userId = user.id;
      if (!userId) throw new Error("no id found");
      loader.style.display = "flex";
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image.files[0]);
      formData.append("author", userId);

      // console.log(...formData);
      const token = JSON.parse(localStorage.getItem("token")) ?? undefined;
      const response = await fetch(
        "https://jadoiradukunda.onrender.com/api/blogs",
        {
          method: "POST",
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log(response.ok);
      if (response.ok) {
        title.value = "";
        description.value = "";
        popupMessage.textContent = "blog created successfully!";
        popupMessage.style.color = "green";
        popupMessage.classList.add("show__popup");
        setTimeout(function () {
          popupMessage.classList.remove("show__popup");
        }, 1500);
        loader.style.display = "none";
      }
      console.log(await response.json());
    } catch (err) {
      popupMessage.textContent = "error creating blog!";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(function () {
        popupMessage.classList.remove("show__popup");
      }, 1500);

      console.log("error ", err);
    }
  });
});
