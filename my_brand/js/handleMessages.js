if (!localStorage.getItem("messages")) {
  const messages = localStorage.setItem("messages", []);
} else {
  let messages = JSON.parse(localStorage.getItem("messages"));
}
