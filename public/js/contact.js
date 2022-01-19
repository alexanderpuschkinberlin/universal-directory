// const form = document.querySelector("#contact-form");
// const email = document.querySelector("#email").value.trim();
// const sbj = document.querySelector("#subject").value.trim();
// const msg = document.querySelector("#message").value.trim();

// // Event listener to Send button

// const sendMsg = (e) => {
//   e.preventDefault();
//   // Function to send email
//   email
//     .send({
//       SecureToken: "1f96d029-475c-4a1f-850e-8bde99d236cb",
//       To: email.val(),
//       From: "theboaringapp@gmail.com",
//       Subject: sbj.val(),
//       Body: msg.val(),
//     })
//     .then((message) => alert(message));
// };

// document.querySelector("#sendBtn").addEventListener("click", sendMsg);

const form = $("#contact-form");
const email = $("#email");
const sbj = $("#subject");
const msg = $("#message");

// Event listener to Send button
$("#sendBtn").click(function sendMsg(e) {
  e.preventDefault();
  // Function to send email
  Email.send({
    SecureToken: "1f96d029-475c-4a1f-850e-8bde99d236cb",
    To: email.val(),
    From: "theboaringapp@gmail.com",
    Subject: sbj.val(),
    Body: msg.val(),
  }).then((message) => alert(message));
});
