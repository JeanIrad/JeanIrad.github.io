import MessageService from "./messageServices.js";
document.addEventListener("DOMContentLoaded", function () {
  const popupMessage = document.querySelector(".popup__message");
  const messageForm = document.getElementById("contactForm");
  messageForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const interest = document.getElementById("interest").value.trim();
    const message = document.getElementById("message").value.trim();
    // console.log(fullName);
    if (!fullName || !email || !interest || !message) {
      popupMessage.textContent = "please fill in all required fields";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(() => {
        popupMessage.classList.remove("show__popup");
      }, 2000);
      return;
    }
    if (fullName.length < 2) {
      popupMessage.textContent = "please provide a meaningful name";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(() => {
        popupMessage.classList.remove("show__popup");
      }, 2000);
      return;
    }
    const testEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!testEmail.test(email)) {
      popupMessage.textContent = "please provide a valid email";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(() => {
        popupMessage.classList.remove("show__popup");
      }, 2000);
      return;
    }
    if (message.length < 20) {
      popupMessage.textContent =
        "message should be at least 20 characters long!";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(() => {
        popupMessage.classList.remove("show__popup");
      }, 2000);
      return;
    }

    const newMessage = {
      fullName,
      email,
      interest,
      message,
    };
    console.log(newMessage);
    const response = await MessageService.sendMessage(newMessage);
    const result = await response.json();
    if (response.status === 201) {
      popupMessage.textContent =
        "Thank you for contacting us, we'll reach out to you soon!";
      popupMessage.style.color = "green";
      popupMessage.classList.add("show__popup");
      setTimeout(() => {
        popupMessage.classList.remove("show__popup");
      }, 2000);
      messageForm.reset();
    } else {
      popupMessage.textContent = "error sending a message, please try again!";
      popupMessage.style.color = "brown";
      popupMessage.classList.add("show__popup");
      setTimeout(() => {
        popupMessage.classList.remove("show__popup");
      }, 2000);
    }
    console.log(result);
  });
});
