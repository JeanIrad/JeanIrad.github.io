const bars = document.querySelector(".fa-bars");
const toggleBg = document.querySelector("#toggle-bg");
const navList = document.querySelector("nav ul");
const navBar = document.querySelector("nav");

bars.onclick = () => {
  navList.classList.toggle("close");
};
toggleBg.onclick = function () {
  // if (this.classList.contains("fa-moon")) {
  document.body.classList.toggle("light-mode");

  navBar.classList.toggle("light-mode");
  document.querySelector("footer").classList.toggle("light-mode");
  // this.classList.remove("fa-moon");
  this.classList.toggle("fa-sun");
  // } else {
  //   this.classList.remove("fa-sun");
  //   this.classList.add("fa-moon");
  // }
};
