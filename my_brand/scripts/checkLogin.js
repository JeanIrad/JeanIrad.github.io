document.addEventListener("DOMContentLoaded", function () {
  const loginItem = document.getElementById("login__item");
  const isUserLogged = new URLSearchParams(window.location.search);
  const isLoggedIn = isUserLogged.get("isLoggedIn");
  const token = JSON.parse(localStorage.getItem("token"));
  //   console.log(isLoggedIn);
  if (token) {
    loginItem.innerHTML = '<a href="" class="active">logout</a>';
  } else {
    loginItem.innerHTML = '<a href="login.html" class="active">Login</a>';
  }
});
