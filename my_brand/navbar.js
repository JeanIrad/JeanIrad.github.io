const bars = document.querySelector(".fa-bars");
const navList = document.querySelector("nav ul");
bars.onclick = () => {
  //   navList.style.top = 0;
  navList.classList.toggle("close");
};

const moon = document.querySelector(".fa-moon");

moon.onclick = function () {
  navList.style.color = "#151733";
  this.classList.remove("fa-moon");
  bars.style.color = "#151733";
  this.style.color = "#151733";
  this.classList.add("fa-sun");
  document.body.style.background = "#eee";
};
