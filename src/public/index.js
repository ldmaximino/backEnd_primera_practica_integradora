const socket = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "Welcome to our chat",
    input: "text",
    inputPlaceholder: "Type your username...",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Username is required";
      }
    },
  }).then((input) => {
    username = input.value;
    socket.emit("newUser", username);
  });
}

const message = document.getElementById("message");
const btnSend = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btnSend.addEventListener("click",(e) => {
  e.preventDefault();
  socket.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socket.on("message", (data) => {
  const chatRender = data
    .map((msg) => {
      return `<p><strong>${data.username}</strong>: ${msg.message}</p>`;
    })
    .join(" ");

  output.innerHTML = chatRender;
});
