// const navItems = document.querySelectorAll(".nav__item");
// const closeNav = document.querySelector(".fa-xmark");
// navItems.forEach((navItem) => {
//   navItem.style.cursor = "pointer";
//   navItem.onclick = function () {
//     !this.classList.contains("active")
//       ? navItems.forEach((item) => item.classList.remove("active")) &
//         this.classList.add("active")
//       : "";
//   };
// });
// closeNav.onclick = function () {
//   this.parentElement.parentElement.style.width = "50%";
// };
const updateDashboardNumbers = (arr, dashItem) => {
  return arr.length > 0
    ? (dashItem.textContent = arr.length)
    : (dashItem.textContent = "No item");
};

const admin = document.getElementById("admin");
const userNum = document.getElementById("userNum");
const blogNum = document.getElementById("blogNum");
console.log(admin);
document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  updateDashboardNumbers(users, userNum);
  updateDashboardNumbers(blogs, blogNum);
  const authorizedPersonel = users.find((user) =>
    user.email.startsWith("adminjean")
  );
  admin.textContent += `  ${authorizedPersonel.firstName}`;
  const blogsPlus = document.querySelector(".fa-plus");
  const updateBlog = document.querySelectorAll(".fa-pen");
  const logoutBtn = document.querySelectorAll(".fa-arrow-right-from-bracket");
  blogsPlus.style.cursor = "pointer";
  blogsPlus.parentElement.onclick = () =>
    (window.location.href = `create_blog.html?isloggedIn=${true}`);
});
