const form = document.getElementById("donorForm");
const confirmationPopup = document.getElementById("confirmationPopup");
const confirmationMessage = document.getElementById("confirmationMessage");
const overlay = document.getElementById("overlay");
const loadingSpinner = document.getElementById("loadingSpinner");
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  loadingSpinner.style.display = "block"; // Show loading spinner
  try {
    const response = await fetch("/donerForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    loadingSpinner.style.display = "none"; // Hide loading spinner
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message);
      return;
    }

    confirmationMessage.innerText = "Donor registered successfully!";
    confirmationPopup.style.display = "block";
    overlay.style.display = "block";
    form.reset(); // Clear the form fields
  } catch (error) {
    loadingSpinner.style.display = "none"; // Hide loading spinner
    console.error("Error:", error);
    alert("There was an error processing your request.");
  }
});

function closePopup() {
  confirmationPopup.style.display = "none";
  overlay.style.display = "none";
}
