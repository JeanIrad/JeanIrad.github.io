const signupForm = document.getElementById("loginForm");
const popupMessage = document.querySelector(".popup__message");
const loader = document.getElementById("loaderContainer");
signupForm.onsubmit = async function (submitEvent) {
  try {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("password").value.trim();
    submitEvent.preventDefault();
    if (!email || !password) {
      popupMessage.textContent = "provide email and password";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(function () {
        popupMessage.classList.remove("show__popup");
      }, 1500);
      return;
    }
    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!validateEmail.test(email)) {
      popupMessage.textContent = "provide a valid email";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(function () {
        popupMessage.classList.remove("show__popup");
      }, 2000);
      return;
    }
    if (password.length < 8) {
      popupMessage.textContent = "provide a valid password";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(function () {
        popupMessage.classList.remove("show__popup");
      }, 2000);
      return;
    }

    loader.style.display = "flex";

    const response = await fetch(
      "https://jadoiradukunda.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    console.log(response.ok);

    if (response.ok) {
      const { message, token, id, isAdmin } = await response.json();
      localStorage.setItem("user", JSON.stringify({ email, id }));
      localStorage.setItem("token", JSON.stringify(token));
      popupMessage.textContent = message;

      popupMessage.classList.add("show__popup");
      loader.style.display = "none";
      popupMessage.style.color = "green";
      if (!isAdmin) {
        setTimeout(function () {
          return (window.location.href = "userDashboard.html?login=true");
        }, 1400);
      }
      setTimeout(function () {
        window.location.assign("dashboard.html?login=true");
      }, 1000);
    } else {
      const { message } = await response.json();
      loader.style.display = "none";
      popupMessage.textContent = message || "error";

      (popupMessage.style.color = "brown"),
        popupMessage.classList.add("show__popup");

      setTimeout(function () {
        popupMessage.classList.remove("show__popup");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};
