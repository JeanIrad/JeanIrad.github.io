const signupForm = document.getElementById("loginForm");
const popupMessage = document.querySelector(".popup__message");

signupForm.onsubmit = async function (submitEvent) {
  try {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("password").value.trim();
    submitEvent.preventDefault();
    // console.log(email, password);
    if (!email || !password) {
      popupMessage.textContent = "provide email and password";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      return;
    }

    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const { message } = await response.json();
    console.log(response.ok);

    if (response.ok) {
      popupMessage.textContent = message;
      popupMessage.classList.add("show__popup");
      popupMessage.style.color = "green";
      setTimeout(function () {
        window.location.href = "dashboard.html?login=true";
      }, 3000);
    } else {
      (popupMessage.textContent = message || "error"),
        (popupMessage.style.color = "brown"),
        popupMessage.classList.add("show__popup");
    }
    if (popupMessage.className === "show__popup") {
      setTimeout(() => {
        // popupMessage.classList.remove("show__popup");
        popupMessage.className = "";
        console.log(popupMessage.className);
      }, 2000);
    }
    console.log(message);
  } catch (err) {
    console.log(err);
  }
};
// console.log(popupMessage.classList);
