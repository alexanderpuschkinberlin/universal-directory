const editProfileHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector("#id").textContent.trim();
  const about = document.querySelector("#about").value.trim();
  const name = document.querySelector("#first-name").value.trim();
  const surname = document.querySelector("#last-name").value.trim();
  const email = document.querySelector("#email-address").value.trim();
  const country = document.querySelector("#country").value.trim();
  const address = document.querySelector("#street-address").value.trim();
  const city = document.querySelector("#city").value.trim();

  const data = { id, about, name, surname, email, country, address, city };
  if (email) {
    const response = await fetch("/api/users/profile/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile/" + id);
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector("#save-btn")
  .addEventListener("click", editProfileHandler);
