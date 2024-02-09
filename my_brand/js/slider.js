const portfolioImage = document.querySelector("#portfolio__image");
const portfolioTitle = document.querySelector("#portfolio__title");
const sliderDivs = document.querySelectorAll(".slider div");
let index = 0;
const nextVal = [
  {
    title: "Game development",
    image: "./images/mine/portfolio/image2.png",
  },
  {
    title: "Data Analytics",
    image: "./images/mine/portfolio/image3.png",
  },
];
setInterval(() => {
  index++;
  portfolioImage.src = nextVal[index].image;
  portfolioTitle.textContent = nextVal[index].title;
  sliderDivs[index].style.background = "#cfa511";
  if (index > 2) {
    index = 0;
  }
}, 3000);
