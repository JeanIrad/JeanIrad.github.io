import MessageService from "./messageServices.js";
const token = JSON.parse(localStorage.getItem("token"));
document.addEventListener("DOMContentLoaded", () => {
  const messageContainer = document.querySelector(".message__container");
  MessageService.getAllMessages(token)

    .then((response) => response.json())
    .then(({ data }) => {
      if (data.length <= 0) {
        messageContainer.innerHTML = "<h1>No messages to display</h1> ";
      } else {
        messageContainer.innerHTML = "";
        data.forEach((message) => {
          const messageDiv = document.createElement("div");
          messageDiv.classList.add("message__card");
          messageDiv.innerHTML = `
          <h2>${message.fullName}</h2>
          <p>${message.email}</p>
          <p>${message.interest}</p>
          <p>${message.message}</p>
          <button class="dbtn">Delete</button>
          <button>Respond</button>
            `;
          messageContainer.appendChild(messageDiv);
        });
        const deleteButtons = document.querySelectorAll(".dbtn");
        // console.log(deleteButtons);
        for (let i = 0; i < deleteButtons.length; i++) {
          deleteButtons[i].addEventListener("click", async (e) => {
            const popup = document.querySelector(".popup__message");
            popup.style.display = "block";
            popup.addEventListener("click", async (e) => {
              if (e.target.textContent === "Cancel") {
                popup.style.display = "none";
                return;
              }
              if (e.target.textContent === "Yes") {
                popup.style.display = "none";
                const response = await MessageService.deleteMessage(
                  token,
                  data[i]._id
                );
                if (response.ok) {
                  deleteButtons[i].parentElement.remove();
                }
              }
            });
          });
        }
      }
    });
  //   console.log(data);
});
