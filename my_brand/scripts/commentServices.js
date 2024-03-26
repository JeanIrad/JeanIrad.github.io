const token = JSON.parse(localStorage.getItem("token"));
export default class CommentService {
  static async makeComment(comment) {
    console.log(token);
    return await fetch("https://jadoiradukunda.onrender.com/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Athorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });
  }
  static getCommentsByBlogId(blogId) {
    return fetch(
      `https://jadoiradukunda.onrender.com/api/comments/blog/${blogId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  static getAllComments() {
    return fetch("https://jadoiradukunda.onrender.com/api/comments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
  }
  static getComment(token, id) {
    return fetch(`https://jadoiradukunda.onrender.com/api/comments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static deleteComment(token, id) {
    return fetch(`https://jadoiradukunda.onrender.com/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static updateComment(token, id, comment) {
    return fetch(`https://jadoiradukunda.onrender.com/api/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });
  }
  static deleteAllComments() {
    return fetch("https://jadoiradukunda.onrender.com/api/comments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
