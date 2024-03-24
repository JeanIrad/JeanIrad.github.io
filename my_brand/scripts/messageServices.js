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
}
