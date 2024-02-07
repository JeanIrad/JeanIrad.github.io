const bars = document.querySelector(".fa-bars");
const navList = document.querySelector("nav ul");
bars.onclick = () => {
  navList.classList.toggle("close");
  alert("hello");
};
