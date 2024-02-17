let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
// creating Blogs

const createBlogForm = document.querySelector("#createBlogForm");
const blogTitle = document.querySelector("#blogTitle");
const blogContent = document.querySelector("#blogContent");
const blogImage = document.querySelector("#blogImage");

createBlogForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const blog = {
    title: blogTitle.value,
    content: blogContent.value,
    image: URL.createObjectURL(blogImage.files[0]),
    id: Date.now(),
    isUpdated: false,
  };
  addBlog(blog);
  blogTitle.value = "";
  blogContent.value = "";
  blogImage.value = "";
});
const addBlog = (blog) => {
  blogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
};

// const displayBlogs = () => {
//   const dashboardBlogContainer = document.querySelector(".blogs");
//   blogs.forEach(({ title }, index) => {
//     const blog = `
// <div class="blog">
// <span>0${index}</span> <span>${title}</span> <span role="button"><i
//         class="fa-solid fa-pen"></i></span><span role="button"><i
//         class="fa-solid fa-trash"></i></span>
// </div>`;
//     dashboardBlogContainer.appendChild(blog);
//   });
// };
// displayBlogs();
/*

                <div class="blog">
                    <span>01</span> <span>blog Name</span> <span role="button"><i
                            class="fa-solid fa-pen"></i></span><span role="button"><i
                            class="fa-solid fa-trash"></i></span>
                </div>
*/
