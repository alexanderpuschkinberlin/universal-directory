// This is for signing up new users

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#first-name").value.trim();
  const surname = document.querySelector("#last-name").value.trim();
  const email = document.querySelector("#email-address").value.trim();
  const birthDate = document.querySelector("#birth-date").value.trim();
  const yearsExperience = document.querySelector("#experience").value.trim();
  const about = document.querySelector("#about").value.trim();
  const tagId = document.querySelector("#tag-id").value.trim(); // How to loop over tag name to get a tag id
  const password = document.querySelector("#password-signup").value.trim();
  const city = document.querySelector("#city").value.trim();
  const fileName = document.querySelector("#file-upload").files[0];
  const country = document.querySelector("#country").value.trim();
  const address = document.querySelector("#street-address").value.trim();
  const zipcode = document.querySelector("#zipcode").value.trim();

  if (
    name &&
    surname &&
    email &&
    birthDate &&
    yearsExperience &&
    about &&
    tagId &&
    password &&
    city &&
    fileName
  ) {
    let formData = new FormData();
    formData.append("upload_image", fileName);
    formData.append("about", about);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("birth_date", birthDate);
    formData.append("zip_code", zipcode);
    formData.append("tag_id", tagId);
    formData.append("years_experience", yearsExperience);
    formData.append("city", city);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      window.location.href = "/";
    } else {
      alert(response.statusText);
    }
  } else {
    document
      .querySelector("#button-container")
      .appendChild(document.createTextNode("Please fill all the fields"));
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("click", signupFormHandler);
