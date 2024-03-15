const fetchBlogs = async () => {
  const response = await fetch("http://localhost:3000/api/v1/blogs", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  console.log(data);
};

fetchBlogs();
