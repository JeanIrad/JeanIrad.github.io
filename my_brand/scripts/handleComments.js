import CommentService from "./commentServices.js";
document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("commentForm");
  const commentContainer = document.querySelector(".comment__container1");
  // collect blog id from the url
  const blogIdSearch = new URLSearchParams(window.location.search);
  const blogId = blogIdSearch.get("id");
  //  creating comments
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const comment = document.getElementById("comment").value.trim();
    if (!comment) return;
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const commentData = {
      comment,
      user: user.id,
      blog: blogId,
    };
    const response = await CommentService.makeComment(commentData, token);
    // console.log("comment", response.ok);
    const data = await response.json();
    console.log(response.status, data, response.headers.get("authorization"));
    if (response.status === 201) {
      commentForm.reset();
    }
  });
  // displaying comments
  commentContainer.innerHTML = "comments loading...";
  CommentService.getCommentsByBlogId(blogId).then((response) => {
    response.json().then(({ data }) => {
      console.log(typeof data);

      commentContainer.innerHTML = "";
      data.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment__card");
        const time = new Date(comment.createdAt).toLocaleString();
        commentDiv.innerHTML = `
        <div>
        <p>${comment.comment}</p>
        <div style="display: flex; justify-content: space-between;">
        <h4>${comment.user.firstName}</h4>
        <span>${time}</span>
        </div>
        </div>
        `;
        commentContainer.appendChild(commentDiv);
      });
    });
  });
});
