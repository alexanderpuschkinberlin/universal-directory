const changestatus = async (id) => {
  const orderId = id;
  const status = document.getElementById("status-" + id).value;

  if (status) {
    const response = await fetch(`/api/order/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "/placedOrder";
    } else {
      alert("Failed to update order!");
    }
  }
};
