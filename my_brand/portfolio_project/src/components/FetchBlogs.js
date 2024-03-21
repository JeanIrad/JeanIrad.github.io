export default async function getBlogs() {
  try {
    const response = await fetch(
      "https://jadoiradukunda.onrender.com/api/blogs"
    );
    const { data } = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log("error fetching", err);
    throw err;
  }
}
