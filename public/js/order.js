// front end for new comment

const placeNewOrder = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector("#first-name").value.trim();
  const last_name = document.querySelector("#last-name").value.trim();
  const order_address = document.querySelector("#street-address").value.trim();
  const city = document.querySelector("#city").value.trim();
  const country = document.querySelector("#country").value.trim();
  //   const tag_id = document.querySelector("#work-type").value.trim();
  const short_description = document.querySelector("#description").value.trim();
  const email = document.querySelector("#email-address").value.trim();
  const zip = document.querySelector("#postal-code").value.trim();

  console.log(
    "Check inputs!!!!!!",
    first_name,
    last_name,
    order_address,
    city,
    country,
    short_description,
    email,
    zip
  );

  if (
    first_name &&
    last_name &&
    order_address &&
    city &&
    country &&
    // tag_id &&
    short_description &&
    email &&
    zip
  ) {
    const response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        order_address,
        city,
        country,
        // tag_id,
        short_description,
        email,
        zip,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to place an Order!");
    }
  }
};

// Listener
document
  .querySelector("#place-order-btn")
  .addEventListener("click", placeNewOrder);
