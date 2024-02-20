const navItems = document.querySelectorAll(".nav__item");
const closeNav = document.querySelector(".fa-xmark");
navItems.forEach((navItem) => {
  navItem.style.cursor = "pointer";
  navItem.onclick = function () {
    !this.classList.contains("active")
      ? navItems.forEach((item) => item.classList.remove("active")) &
        this.classList.add("active")
      : "";
  };
});
closeNav.onclick = function () {
  this.parentElement.parentElement.style.width = "50%";
};
