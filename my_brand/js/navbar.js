const bars = document.querySelector("#bars");
const toggleBg = document.querySelector("#toggle-bg");
const navList = document.querySelector("nav ul");
const navBar = document.querySelector("nav");
const body = document.body;
const footer = document.querySelector("footer");

bars.onclick = function () {
  navList.classList.toggle("close");
  if (navList.classList.contains("close")) {
    this.classList.remove("fa-bars");
    this.classList.add("fa-xmark");
  } else {
    this.classList.remove("fa-xmark");
    this.classList.add("fa-bars");
  }
};
toggleBg.onclick = function () {
  // navBar.classList.toggle("light__mode");
  footer.classList.toggle("light__mode");
  if (body.className === "dark__mode" && this.classList.contains("fa-moon")) {
    body.className = "light__mode";
    this.classList.remove("fa-moon");
    // navBar.classList.toggle("nav__light__mode");
    navBar.className = "nav__light__mode";
    this.classList.add("fa-sun");
  } else {
    this.classList.remove("fa-sun");
    this.classList.add("fa-moon");
    body.className = "dark__mode";
    navBar.className = "nav__dark__mode";
  }

  console.log(this.className);
  // document.querySelector("footer").classList.toggle("light-mode");
  // this.classList.remove("fa-moon");
  // this.classList.toggle("fa-sun");
  // } else {
  //   this.classList.remove("fa-sun");
  //   this.classList.add("fa-moon");
  // }
};
