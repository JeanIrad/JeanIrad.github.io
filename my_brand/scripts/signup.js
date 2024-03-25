document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const popupMessage = document.querySelector(".popup__message");
  const loader = document.getElementById("loaderContainer");
  signupForm.onsubmit = async function (submitEvent) {
    submitEvent.preventDefault();
    try {
      const email = document.getElementById("signup_email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("passwordConfirm")
        .value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      if (!firstName || !lastName || !email) {
        popupMessage.textContent = "please provide inputs";
        popupMessage.style.color = "brown";
        popupMessage.classList.add("show__popup");
        setTimeout(function () {
          popupMessage.classList.remove("show__popup");
        }, 1500);
        return;
      }
      const passwordTest =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (password.length < 8 || !passwordTest.test(password)) {
        popupMessage.textContent =
          "password must be at least 8 charactersstrong and strong";
        popupMessage.style.color = "brown";
        popupMessage.classList.add("show__popup");
        setTimeout(function () {
          popupMessage.classList.remove("show__popup");
        }, 1500);
        return;
      }
      if (password !== confirmPassword) {
        popupMessage.textContent = "Passwords must match!";
        popupMessage.style.color = "brown";
        popupMessage.classList.add("show__popup");
        setTimeout(function () {
          popupMessage.classList.remove("show__popup");
        }, 1500);
        return;
      }
      loader.style.display = "flex";
      const response = await fetch(
        "https://jadoiradukunda.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );
      const { message } = await response.json();
      console.log(message);
      if (response.ok) {
        setTimeout(function () {
          popupMessage.classList.remove("show__popup");
        }, 1500);
        popupMessage.textContent = message + " please verify your email";
        popupMessage.classList.add("show__popup");
        loader.style.display = "none";
        popupMessage.style.color = "green";
        signupForm.reset();
      } else {
        (popupMessage.textContent = message || "error"),
          (popupMessage.style.color = "brown"),
          popupMessage.classList.add("show__popup");
        setTimeout(function () {
          popupMessage.classList.remove("show__popup");
        }, 1500);
      }
      console.log(response.ok);
    } catch (err) {
      console.log(err);
    }
  };
});
