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
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        email,
        birth_date: birthDate,
        years_experience: yearsExperience,
        about,
        tag_id: tagId,
        password,
        city,
        upload_image: fileName,
      }),
      headers: { "Content-Type": "application/json" },
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
