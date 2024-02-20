const bars = document.querySelector(".fa-bars");
const moon = document.querySelector(".toggle-bg");
const navList = document.querySelector("nav ul");
const navBar = document.querySelector("nav");
const footer = document.querySelector("footer");
// const contactImageBg = document.querySelector(".contact__container .image") || null;
const allParagraphs = document.querySelectorAll("p");
const allLinks = document.querySelectorAll("a");
const allLabels = document.querySelectorAll("label");
const allSpans = document.querySelectorAll("span");
const allsubheaders = document.querySelectorAll("h4");
const allTextarea = document.querySelectorAll("textarea");
const allSelect = document.querySelectorAll("select");
const allInputs = document.querySelectorAll("input");
const allH3 = document.querySelectorAll("h3");
const body = document.body;
body.style.transition = "background 0.5s ease-in-out";
let combined = [
  ...allLinks,
  ...allParagraphs,
  ...allsubheaders,
  ...allSpans,
  ...allInputs,
  ...allLabels,
  ...allSelect,
  ...allTextarea,
  ...allH3,
];
combined.forEach((tag) => tag.classList.add("dark-mode_text"));
bars.onclick = () => {
  navList.classList.toggle("close");
};
moon.style.cursor = "pointer";
moon.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-moon")) {
    body.classList.add("dark-mode");
    this.classList.remove("fa-moon");
    this.classList.add("fa-sun");

    // implement changes to bg:
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      navBar.classList.add("light-mode");
      footer.classList.add("light-mode");
      bars.classList.add("light-mode_text");
      navList.classList.add("light-mode");
      // contactImageBg.classList.add("contact_image__light__background");
      combined.forEach((tag) => {
        tag.classList.remove("dark-mode_text");
        tag.classList.add("light-mode_text");
      });
    }

    // console.log(this.classList[1]);
  } else if (e.target.classList.contains("fa-sun")) {
    body.classList.add("light-mode");
    this.classList.remove("fa-sum");
    this.classList.add("fa-moon");

    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    navBar.classList.remove("light-mode");
    bars.classList.remove("light-mode_text");
    footer.classList.remove("light-mode");
    navList.classList.remove("light-mode");
    contactImageBg.classList.remove("contact_image__light__background");

    combined.forEach((tag) => tag.classList.remove("light-mode_text"));
  }
});
