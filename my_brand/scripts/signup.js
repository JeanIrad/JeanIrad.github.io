const signupForm = document.getElementById("signupForm");
const popupMessage = document.querySelector(".popup__message");
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
    }
    if (password !== confirmPassword) {
      popupMessage.textContent = "Passwords must match!";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      return;
    }

    const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const { message } = await response.json();
    if (response.ok) {
      popupMessage.textContent = message;
      popupMessage.classList.add("show__popup");
      popupMessage.style.color = "green";
    } else {
      (popupMessage.textContent = message || "error"),
        (popupMessage.style.color = "brown"),
        popupMessage.classList.add("show__popup");
    }
    console.log(response.ok);
  } catch (err) {
    console.log(err);
  }
  // setTimeout(() => {
  //   console.log("executing after 2 secs");

  //   console.log("popup class captured");
  //   popupMessage.classList.remove("show__popup");
  //   // popupMessage.className = "";
  //   console.log(popupMessage.className);
  // }, 2000);
};
