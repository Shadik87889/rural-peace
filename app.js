const form = document.getElementById("newsletterForm");
const unsubscribeForm = document.getElementById("unsubscribeForm");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeModal = document.querySelector(".close");
let focus = document.getElementById("email");
focus.focus();
// Function to show modal with a message
function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "flex";
}

// Function to close modal
closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Handle newsletter subscription
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  try {
    const response = await fetch("https://ruralpeace.org/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    showModal(data.message);
    form.reset();
  } catch (error) {
    showModal("Error: " + error.message);
  }
});

// Handle newsletter unsubscription
unsubscribeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("unsubscribeEmail").value;

  try {
    const response = await fetch("https://ruralpeace.org/unsubscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    showModal(data.message);
    unsubscribeForm.reset();
  } catch (error) {
    showModal("Error: " + error.message);
  }
});
