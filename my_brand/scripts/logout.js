document.addEventListener("DOMContentLoaded", function () {
  const loginBtns = document.querySelectorAll(".logout");
  loginBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.assign("index.html");
    });
  });
});
