export default class MessageService {
  static async sendMessage(message) {
    const response = await fetch(
      "https://jadoiradukunda.onrender.com/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    return response;
  }
  static async getAllMessages(token) {
    const response = await fetch(
      "https://jadoiradukunda.onrender.com/api/messages",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
  static async getMessage(token, id) {
    const response = await fetch(
      `https://jadoiradukunda.onrender.com/api/messages/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
  static async deleteMessage(token, id) {
    return await fetch(
      `https://jadoiradukunda.onrender.com/api/messages/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  static async updateMessage(token, id, message) {
    return await fetch(
      `https://jadoiradukunda.onrender.com/api/messages/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      }
    );
  }
}
