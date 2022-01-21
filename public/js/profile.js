const orderPage = document.querySelector("#order-page");
const workerId = document.querySelector("#id").textContent.trim();

const renderOrder = async (event) => {
  event.preventDefault();
  window.location.replace(`/order?workerId=${workerId}`);
};

const editProfileHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector("#id").textContent.trim();
  const about = document.querySelector("#about").value.trim();
  const name = document.querySelector("#first-name").value.trim();
  const surname = document.querySelector("#last-name").value.trim();
  const email = document.querySelector("#email-address").value.trim();
  const country = document.querySelector("#country").value.trim();
  const address = document.querySelector("#street-address").value.trim();
  const zipcode = document.querySelector("#zipcode").value.trim();
  const city = document.querySelector("#city").value.trim();
  const fileName = document.querySelector("#file-upload").files[0];
  const data = { id, about, name, surname, email, country, address, city };
  console.log(fileName);

  if (email) {
    let formData = new FormData();
    formData.append("upload_image", fileName);
    formData.append("id", id);
    formData.append("about", about);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("address", address);
    formData.append("zip_code", zipcode);
    formData.append("city", city);
    const response = await fetch("/api/users/profile/" + id, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      document.location.replace("/profile/" + id);
    } else {
      alert("Failed to update profile");
    }
  }
};

document
  .querySelector("#save-btn")
  .addEventListener("click", editProfileHandler);

document.getElementById("order-page").addEventListener("click", renderOrder);
