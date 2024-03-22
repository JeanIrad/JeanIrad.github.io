document.addEventListener("DOMContentLoaded", function () {
  const blogsContainer = document.querySelector(".blogs");

  const displayBlogsOnLandingPage = async () => {
    try {
      const response = await fetch(
        `https://jadoiradukunda.onrender.com/api/blogs/`
      );
      const returnedData = await response.json();
      if (response.ok) {
        const { data } = returnedData;
        if (data.length > 0) {
          data.forEach((blog) => {
            const container = document.createElement("div");
            container.classList.add("blog__container");
            container.innerHTML = `<div class="image">
          <img src="${blog.imageUrl}" alt="blog Image">
          </div>
          <h4>${blog.title}</h4>
          <p>${blog.description.slice(0, 40)}...</p>
      
      <a href="single_blog.html?id=${blog._id}">read More</a>`;
            blogsContainer.append(container);
          });
        } else {
          blogsContainer.innerHTML = "<h1>No Blog created yet!</h1>";
        }
      } else {
        blogsContainer.innerHTML = "<h1>No Blog created yet!</h1>";
      }
    } catch (err) {
      console.log("error fetching blogs", err);
      throw err;
    }
  };
  displayBlogsOnLandingPage();
});

/*
   <div class="blog__container">
            <div class="image">
                <img src="./images/mine/blogs/image3.png" alt="blog Image">
                <h4>blog Title</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis libero vitae harum! Voluptatem,
                    quod voluptates quaerat iste fuga voluptate minus aperiam delectus amet natus placeat laborum est,
                    distinctio iure deserunt!</p>
            </div>
            <a href="single_blog.html">read More</a>
        </div>
*/
