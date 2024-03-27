import MessageService from "./messageServices.js";
const token = JSON.parse(localStorage.getItem("token"));
document.addEventListener("DOMContentLoaded", () => {
  const messageContainer = document.querySelector(".message__container");
  const close = document.querySelector(".close");
  close.onclick = () => {
    document.querySelector(".response__container").style.display = "none";
  };
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
          <button class="rbtn">Respond</button>
            `;
          messageContainer.appendChild(messageDiv);
        });
        // responding to message
        const respondButtons = document.querySelectorAll(".rbtn");
        respondButtons.forEach((button, index) => {
          button.addEventListener("click", async (e) => {
            document.getElementById("to").value = data[index].email;
            document.getElementById("reason").value = data[index].interest;
            document.querySelector(".response__container").style.display =
              "flex";
            const name = data[index].fullName;
            const email = data[index].email;
            const interest = data[index].interest;
            // const message = data[index].message;
            const respondForm = document.getElementById("respondForm");
            const laoder = document.querySelector(".loader");
            const confirm = document.querySelector(".confirm__message");
            respondForm.addEventListener("submit", async (e) => {
              e.preventDefault();
              const message = document.getElementById("response").value.trim();
              if (!message) {
                laoder.style.display = "none";
                confirm.textContent = "Please enter a message";
                confirm.style.color = "brown";
                confirm.style.display = "block";
              }
              laoder.style.display = "block";
              const response = await MessageService.sendResponse({
                name,
                email,
                reason: interest,
                content: message,
              });
              if (response.ok) {
                respondForm.reset();
                confirm.textContent = "Message sent successfully";
                confirm.style.color = "green";
                confirm.style.display = "block";
                laoder.style.display = "none";
                setTimeout(() => {
                  document.querySelector(".response__container").style.display =
                    "none";
                  // confirm.style.display = "none";
                }, 3000);
              }
            });
          });
        });
        // delete message
        const deleteAll = document.getElementById("deleteAll");
        deleteAll.addEventListener("click", async (e) => {
          const popup = document.querySelector(".popup__message");
          popup.style.display = "block";
          popup.addEventListener("click", async (e) => {
            if (e.target.textContent === "Cancel") {
              popup.style.display = "none";
              return;
            }
            if (e.target.textContent === "Yes") {
              popup.style.display = "none";
              const response = await MessageService.deleteAllMessages(token);
              if (response.ok) {
                messageContainer.innerHTML = "<h1>No messages to display</h1> ";
              }
            }
          });
        });
        const deleteButtons = document.querySelectorAll(".dbtn");

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
