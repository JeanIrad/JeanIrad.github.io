const idParams = new URLSearchParams(window.location.search);
const searchId = +idParams.get("id");
const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

const blog = blogs.find((blog) => blog.id === searchId);
console.log(blog);
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("blog__title");
  const content = document.getElementById("blog__content");
  const image = document.getElementById("blog__image");
  title.textContent = blog.title;
  content.textContent = blog.content;
  image.src = blog.image;
});

/*
<div>
            <img src="./images/mine/singleblog/blogpic.png" alt="blog pic">
            <h2 id="blog__title">blog title</h2>
            <div class="blog__content">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam itaque, quae neque nisi voluptas aut
                    laborum,
                    repellendus labore deserunt consequuntur, amet quisquam esse. Minima aspernatur cumque, perferendis
                    consequuntur temporibus sed?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis laboriosam eos aliquid,
                    reprehenderit
                    eaque
                    asperiores debitis, enim vel dolore fugiat deserunt nihil facere est nulla ducimus consequuntur!
                    Quidem,
                    consequuntur voluptates.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo minima consequatur rerum voluptates,
                    praesentium tempora deleniti reiciendis sunt itaque? Dolorem nulla maxime neque, fuga ab eaque
                    blanditiis molestiae consequatur tempore.</p>
                <span>14<i class="fa-solid fa-heart"></i></span>
            </div>
*/
