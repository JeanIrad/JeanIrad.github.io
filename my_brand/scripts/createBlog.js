document.addEventListener("DOMContentLoaded", function () {
  tinymce.init({
    selector: "textarea",
    plugins:
      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    mergetags_list: [
      { value: "First.Name", title: "First Name" },
      { value: "Email", title: "Email" },
    ],
    ai_request: (request, respondWith) =>
      respondWith.string(() =>
        Promise.reject("See docs to implement AI Assistant")
      ),
  });

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
      let title = document.getElementById("blogTitle");
      const description = tinymce.get("blogContent").getContent();
      const image = document.getElementById("blogImage");
      const user = JSON.parse(localStorage.getItem("user")) || {};
      if (!user) throw new Error("No user found!");
      const userId = user.id;
      if (!userId) throw new Error("no id found");
      if (!title.value.trim() || !description.trim()) {
        popupMessage.textContent = "Title and description are required!";
        popupMessage.style.color = "brown";
        popupMessage.classList.add("show__popup");
        setTimeout(function () {
          popupMessage.classList.remove("show__popup");
        }, 1500);
        // throw new Error("Title and description are required");
        return;
      }
      loader.style.display = "flex";
      // must implement, handling some cases where we have an internal server error
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("description", description);
      formData.append("author", userId);
      image.files.length > 0 && formData.append("image", image.files[0]);
      console.log(...formData);
      const token = JSON.parse(localStorage.getItem("token")) ?? undefined;
      const response = await fetch(
        "https://jadoiradukunda.onrender.com/api/blogs",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log(response.ok);
      if (response.ok) {
        title = "";
        // description.value = "";
        tinymce.get("blogContent").setContent("");
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
