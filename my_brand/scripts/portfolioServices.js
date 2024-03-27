export default class PortfolioService {
  static async getAllPortfolioItems() {
    const response = await fetch(
      "https://jadoiradukunda.onrender.com/api/portfolio",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
  static async getPortfolioItem(token, id) {
    const response = await fetch(
      `https://jadoiradukunda.onrender.com/api/portfolio/${id}`,
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
  static async createPortfolioItem(token, portfolioItem) {
    return await fetch(`https://jadoiradukunda.onrender.com/api/portfolio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(portfolioItem),
    });
  }
  static async updatePortfolioItem(token, id, portfolioItem) {
    return await fetch(
      `https://jadoiradukunda.onrender.com/api/portfolio/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(portfolioItem),
      }
    );
  }
  static async deletePortfolioItem(token, id) {
    return await fetch(
      `https://jadoiradukunda.onrender.com/api/portfolio/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
