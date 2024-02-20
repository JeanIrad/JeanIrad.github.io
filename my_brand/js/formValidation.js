const contactForm = document.getElementById("contactForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const interest = document.getElementById("interest");
let validationMessage = "";
const spanError = document.createElement("span");
spanError.style.color = "#f44331";
// spanError.style.marginTop = "-2.5rem";
const validateInput = (input) => {
  const nameValidator = /\d/;
  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  input.oninput = function () {
    if (this.id === "fullName") {
      if (this.value.trim().length < 3 || nameValidator.test(this.value)) {
        return callErrorMssg(
          input,
          "Name should not be null or contains no number",
          true
        );
      } else {
        return callErrorMssg(input, "", false);
      }
    } else if (this.id === "email") {
      if (!emailValidator.test(this.value)) {
        callErrorMssg(input, "Please provide a valid email", true);
      } else {
        return callErrorMssg(input, "", false);
      }
    } else if (this.id === "interest") {
      if (this.value === "") {
        return callErrorMssg(input, "Please choose your interest!", true);
      } else {
        return callErrorMssg(input, "", false);
      }
    } else if (this.id === "message") {
      if (this.value.length < 20) {
        return callErrorMssg(
          input,
          "Please Provide the meaningful message!",
          true
        );
      } else {
        return callErrorMssg(input, "", false);
      }
    }
  };
};
const callErrorMssg = (input, msg, val) => {
  if (val) {
    input.classList.add("validationError");
    validationMessage = msg;
    spanError.textContent = validationMessage;
    input.insertAdjacentElement("afterend", spanError);
    return false;
  } else {
    input.classList.remove("validationError");
    spanError.remove();
    return true;
  }
};

validateInput(fullName);
validateInput(email);
validateInput(interest);
validateInput(message);
const appreciateUser = document.createElement("p");
appreciateUser.textContent = "Thank you for contacting us!";
appreciateUser.style.color = "lightgreen";
appreciateUser.style.textAlign = "center";
appreciateUser.style.backgroundColor = "#cfa412";
appreciateUser.style.padding = "0.5rem 1rem";
console.log(typeof appreciateUser.style);
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput(fullName);
  validateInput(email);
  validateInput(interest);
  validateInput(message);
  if (
    fullName.value.trim() === "" ||
    email.value.trim() === "" ||
    interest.value.trim() === "" ||
    message.value.trim() === ""
  ) {
    fullName.classList.add("validationError");
    email.classList.add("validationError");
    message.classList.add("validationError");
    interest.classList.add("validationError");
    return;
  } else {
    fullName.classList.remove("validationError");
    email.classList.remove("validationError");
    message.classList.remove("validationError");
    interest.classList.remove("validationError");
    fullName.value = "";
    email.value = "";
    interest.value = "";
    message.value = "";
    contactForm.parentElement.prepend(appreciateUser);
    setTimeout(() => {
      appreciateUser.style.display = "none";
    }, 4000);
    // alert("Thank you for contacting us!");
  }
});
