async function getBlogs() {
  const response = await fetch("http://localhost:3000/api/v1/blogs/");
  const { data } = await response.json();
  console.log(data);
}
getBlogs();
