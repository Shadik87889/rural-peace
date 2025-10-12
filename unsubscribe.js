document.getElementById("unsubscribeForm").onsubmit = function (event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(this);
  const email = formData.get("email");

  fetch("/unsubscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("message").innerText = data.message;
      this.reset(); // Reset the form
    })
    .catch((error) => {
      document.getElementById("message").innerText = "Error: " + error;
    });
};
