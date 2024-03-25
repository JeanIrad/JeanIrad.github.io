export default class CommentService {
  static makeComment(comment) {
    return fetch("https://jadoiradukunda.onrender.com/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  }
  static getAllComments(token) {
    return fetch("https://jadoiradukunda.onrender.com/api/comments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
}
