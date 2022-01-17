// This is for signing up new users
const signupFormHandler = async (event) => {
  event.preventDefault();

  // const username = document.querySelector("#username-signup").value.trim();
  const name = document.querySelector("#first-name").value.trim();
  const surname = document.querySelector("#last-name").value.trim();
  const email = document.querySelector("#email-address").value.trim();
  const birth_date = document.querySelector("#birth-date").value.trim();
  const years_experience = document.querySelector("#experience").value.trim();
  const about = document.querySelector("#about").value.trim();
  const tag_id = document.querySelector("#tag-id").value.trim(); // How to loop over tag name to get a tag id
  const password = document.querySelector("#password-signup").value.trim();

  if (
    // username &&
    email &&
    password &&
    name &&
    surname &&
    birth_date &&
    tag_id
  ) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        // username,
        email,
        password,
        name,
        surname,
        birth_date,
        tag_id,
        years_experience,
        about,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
