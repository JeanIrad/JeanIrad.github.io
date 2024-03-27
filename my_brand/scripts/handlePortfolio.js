import PortfolioService from "./portfolioServices.js";
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const response = await PortfolioService.getAllPortfolioItems();
  if (response.ok) {
    const { portfolios } = await response.json();
    const portfolioContainer = document.getElementById("portfolioContainer");
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
    console.log(portfolios);
    const portfolioSlider = document.querySelector(".portfolio__slider");

    portfolios.forEach((portfolioItem, i) => {
      const portfolioItemElement = document.createElement("div");
      const sliderDiv = document.createElement("div");
      // sliderDiv.classList.add("active");
      portfolioItemElement.classList.add("portfolio__item");
      portfolioItemElement.classList.add("active");
      portfolioItemElement.innerHTML = `
      <div class="portfolio__item__image">
        <img src="${portfolioItem.imageUrl}" alt="${portfolioItem.title}" />
      </div>
      <div class="text__container">
        <h2>${portfolioItem.name}</h2>
        <p>${portfolioItem.description}</p>
        <button>
        <a href="${portfolioItem.url}" target="_blank">View Project</a>
        </button>
      </div>
      `;
      portfolioContainer.appendChild(portfolioItemElement);
      portfolioSlider.appendChild(sliderDiv);
    });
    // implement slider function to slide through portfolio items
    const slideBtns = document.querySelectorAll(".portfolio__slider div");
    const portfolio__items = document.querySelectorAll(".portfolio__item");
    portfolio__items.forEach((item, i) => {
      if (i !== 0) {
        item.classList.remove("active");
      }
    });
    const portfolioItems = document.querySelectorAll(".portfolio__item");
    let counter = 0;
    if (counter < portfolios.length) {
      slideBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
          counter = i;
          slideBtns.forEach((btn) => btn.classList.remove("active"));
          btn.classList.add("active");
          portfolioItems.forEach((item) => item.classList.remove("active"));
          portfolioItems[counter].classList.add("active");
          if (counter === portfolios.length - 1) {
            counter = 0;
          }
        });
      });
    }
  }
});
//   const deleteButtons = document.querySelectorAll(".dbtn");
//   const updateButtons = document.querySelectorAll(".ubtn");
//   for (let i = 0; i < deleteButtons.length; i++) {
//     deleteButtons[i].addEventListener("click", async (e) => {
//       const popup = document.querySelector(".popup__message");
//       popup.style.display = "block";
//       popup.addEventListener("click", async (e) => {
//         if (e.target.textContent === "Cancel") {
//           popup.style.display = "none";
//           return;
//         }
//         if (e.target.textContent === "Yes") {
//           popup.style.display = "none";
//           const response = await PortfolioService.deletePortfolioItem(
//             token,
//             data[i]._id
//           );
//           if (response.ok) {
//             deleteButtons[i].parentElement.parentElement.remove();
//           }
//         }
//       });
//     });
//     updateButtons[i].addEventListener("click", async (e) => {
//       const popup = document.querySelector(".popup__message");
//       popup.style.display = "block";
//       popup.addEventListener("click", async (e) => {
//         if (e.target.textContent === "Cancel") {
//           popup.style.display = "none";
//           return;
//         }
//         if (e.target.textContent === "Yes") {
//           popup.style.display = "none";
//           const title = document.getElementById("title").value;
//           const description = document.getElementById("description").value;
//           const url = document.getElementById("url").value;
//           const image = document.getElementById("image").value;
//           const portfolioItem = {
//             title,
//             description,
//             url,
//             image,
//           };
//           const response = await PortfolioService.updatePortfolioItem(
//             token,
//             data[i]._id,
//             portfolioItem
//           );
//           if (response.ok) {
//             window.location.reload();
//           }
//         }
//     }
//       )
// }
//     )
