const signupPostHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const surname = document.querySelector("#surename").value.trim();
  const email = document.querySelector("#email").value.trim();
  const birthDate = document.querySelector("#birth-date").value.trim();
  const password = document.querySelector("#password").value.trim();
  //   console.log(name, surname, email, birthDate, password);
  if (name && surname && email && birthDate && password) {
    const response = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({ name, surname, email, birthDate, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign-up");
    }
  } else {
    alert("Please fill all the fields");
  }
};
document
  .querySelector("#signupbtn")
  .addEventListener("click", signupPostHandler);
