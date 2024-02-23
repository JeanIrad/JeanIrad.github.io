let users = JSON.parse(localStorage.getItem("users")) || [];
// Login variables
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login__password");
const loginForm = document.querySelector("#loginForm");
const loginInputs = document.querySelectorAll(".login__input");

const signupForm = document.getElementById("signupForm");
const userName = document.querySelector("#fullName");
const signupEmail = document.querySelector("#signup_email");
const signupPassword = document.querySelector("#signup_password");
const confirmPassword = document.querySelector("#passwordConfirm");
const fieldset = document.querySelectorAll("fieldset");
const inputs = document.querySelectorAll(".sign__input");
const confirmMessage = document.querySelector(".popup__message");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errorHTML = document.createElement("span");
errorHTML.style.marginTop = "-1rem";
errorHTML.style.color = "#fa4433";

document.addEventListener("DOMContentLoaded", function () {
  const validatePassword = (password1, password2, message1, message2) => {
    errorHTML.textContent = message1;
    password1.oninput = function () {
      if (this.value.trim().length < 8) {
        return this.parentElement.insertAdjacentElement("afterend", errorHTML);
      } else {
        return (errorHTML.style.display = "none");
      }
    };
    password2.oninput = function () {
      if (this.value.trim() !== password1.value.trim()) {
        errorHTML.textContent = message2;
        return this.parentElement.insertAdjacentElement("afterend", errorHTML);
      } else {
        return (errorHTML.style.display = "none");
      }
    };
  };

  const validateName = (name, message) => {
    return (name.oninput = function () {
      if (
        this.value.trim().length < 3 ||
        this.value.trim().split(" ").length < 2
      ) {
        errorHTML.textContent = message;
        return this.parentElement.insertAdjacentElement("afterend", errorHTML);
      } else {
        return (errorHTML.style.display = "none");
      }
    });
  };
  const validateEmail = (email) => {
    errorHTML.textContent = "Please provide a valid email";
    return (email.oninput = function () {
      if (!emailRegex.test(this.value)) {
        return this.parentElement.insertAdjacentElement("afterend", errorHTML);
      } else {
        errorHTML.style.display = "none";
      }
    });
  };
  validatePassword(
    signupPassword,
    confirmPassword,
    "Password should be at least 8 characters",
    "Passwords must match"
  );
  validateName(userName, "Please Write Fist Name and Last Name");
  validateEmail(signupEmail);

  const createUser = (user) => {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  };

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      !userName.value.trim() === "" ||
      !emailRegex.test(signupEmail.value) ||
      !signupPassword.value.trim() === confirmPassword.value.trim()
    ) {
      inputs.forEach((input) => {
        errorHTML.textContent = "Please Fill in this field";
        input.parentElement.insertAdjacentElement("afterend", errorHTML);
      });
      return;
    } else {
      const user = {
        fullName: userName.value.trim(),
        firstName: userName.value.trim().split(" ")[0],
        latName: userName.value.trim().split(" ")[1],
        password: signupPassword.value,
        email: signupEmail.value,
      };
      userName.value = "";
      confirmPassword.value = "";
      signupEmail.value = "";
      signupPassword.value = "";
      createUser(user);
      confirmMessage.innerHTML = "<p>User created successfully!</p>";
      confirmMessage.style.color = "lightgreen";
      confirmMessage.style.display = "grid";
      setTimeout(() => {
        confirmMessage.style.display = "none";
      }, 2000);
    }
  });

  const loginUser = (email, password) => {
    const user = users.find((user) => user.email === email);
    console.log(user);
    if (user !== undefined) {
      if (user.email.startsWith("adminjean")) {
        return (window.location.href = "dashboard.html");
      } else {
        const checkPassword = user.password === password;
        if (checkPassword) {
          return (window.location.href = `index.html?isLoggedIn=${true}`);
        } else {
          console.log("Invalid Password");
          confirmMessage.textContent = "invalid Password";
          confirmMessage.style.color = "brown";
          confirmMessage.style.display = "grid";
          setTimeout(() => {
            confirmMessage.style.display = "none";
          }, 2000);
          return;
        }
      }
    } else {
      confirmMessage.textContent = "Invalid User!";
      confirmMessage.style.color = "brown";
      confirmMessage.style.display = "grid";
      setTimeout(() => {
        confirmMessage.style.display = "none";
      }, 2000);
    }
  };
  // loginUser("jado.milton@gmail.com", "jean");
  validateEmail(loginEmail);

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(loginInputs);
    if (
      !emailRegex.test(loginEmail.value) &&
      loginPassword.value.trim() === ""
    ) {
      errorHTML.textContent = "Please provide valid credentials";
      loginInputs.forEach((item) => {
        item.parentElement.insertAdjacentElement("afterend", errorHTML);
      });
    } else {
      loginUser(loginEmail.value, loginPassword.value);
    }
  });
});
