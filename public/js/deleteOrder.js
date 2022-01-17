// Delete comment frontend

const deleteComment = async (event) => {
  event.preventDefault();
  //   console.log("Order was completed");

  //   check if the status was changed to Done
  var selectobject = document.getElementById("order-status");
  for (var i = 0; i < selectobject.length; i++) {
    if (selectobject.options[i].value == "Done") {
      const orderID = window.location.pathname.split("/").pop();
      console.log("Cheeeeeck!!!!", orderID);
      const response = await fetch(`/api/order/${orderID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        alert("Failed to delete order!");
      }
    }
  }
};

document
  .querySelector("#order-status")
  .addEventListener("click", deleteComment);
