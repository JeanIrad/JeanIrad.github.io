const bars = document.querySelector("#bars");
const toggleBg = document.querySelector("#toggle-bg");
const navList = document.querySelector("nav ul");
const navBar = document.querySelector("nav");
const body = document.body;
const footer = document.querySelector("footer");
const links = document.querySelectorAll("a");
const fontAwesomeIcons = document.querySelectorAll("i");

bars.onclick = function () {
  navList.classList.toggle("open_nav");
  if (navList.classList.contains("open_nav")) {
    this.classList.remove("fa-bars");
    this.classList.add("fa-xmark");
  } else {
    this.classList.remove("fa-xmark");
    this.classList.add("fa-bars");
  }
};
toggleBg.onclick = function () {
  body.classList.toggle("dark_mode");
  if (this.classList.contains("fa-moon")) {
    this.classList.remove("fa-moon");
    this.classList.add("fa-sun");
    links.forEach((link) => (link.style.color = "#dfe5e4"));
    fontAwesomeIcons.forEach((link) => (link.style.color = "#dfe5e4"));
    footer.style.backgroundColor = "#000c24";
  } else {
    this.classList.remove("fa-sun");
    this.classList.add("fa-moon");
    links.forEach((link) => (link.style.color = "#000c24"));
    fontAwesomeIcons.forEach((link) => (link.style.color = "#000c24"));
    footer.style.backgroundColor = "#dfe5e4";
  }
};
