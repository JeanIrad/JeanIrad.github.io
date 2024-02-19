const navItems = document.querySelectorAll(".nav__item");
// console.log(navItems);
navItems.forEach((navItem) => {
  navItem.style.cursor = "pointer";
  navItem.onclick = function () {
    !this.classList.contains("active")
      ? navItems.forEach((item) => item.classList.remove("active")) &
        this.classList.add("active")
      : "";
  };
});
navItems[0].classList.add("active");
