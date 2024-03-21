import "../styles/messages.css";
import getBlogs from "./FetchBlogs.js";
export default function MessageCard() {
  // console.log(getBlogs());
  const blogs = getBlogs()
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  console.log("blogs got", blogs);
  return (
    <div className="message__card__container">
      <h1>Messenger Name</h1>
      <h2>Messanger Email</h2>
      <p>Messanger message</p>
    </div>
  );
}
