const showPasswordMssg = document.createElement("span");
showPasswordMssg.textContent = "write a valid password";
showPasswordMssg.style.color = "brown";
showPasswordMssg.style.marginTop = "-0.5rem";
const showPasswordIcon = document.getElementById("showPassword");
const passwordText = document.getElementById("password");

function showPassword(password, icon) {
  icon.addEventListener("click", function (e) {
    if (password.value.trim().length > 0) {
      if (e.target.classList.contains("fa-eye")) {
        password.type = "text";
        e.target.classList.remove("fa-eye");
        e.target.classList.add("fa-eye-slash");
      } else {
        e.target.classList.remove("fa-eye-slash");
        e.target.classList.add("fa-eye");
        password.type = "password";
      }
    } else {
      password.parentElement.insertAdjacentElement(
        "afterend",
        showPasswordMssg
      );
      setTimeout(() => {
        showPasswordMssg.style.display = "none";
      }, 2000);
    }
  });
}
showPassword(passwordText, showPasswordIcon);
showPassword(document.getElementById("passwordConfirm"), showPasswordIcon);
