document
  .getElementById("deleteDonorForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const secretCode = document.getElementById("secretCode").value;

    try {
      const response = await fetch("/deleteDonor", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, secretCode }),
      });

      const data = await response.json();
      document.getElementById("responseMessage").textContent = data.message;

      if (response.ok) {
        // Optionally, clear the form or redirect the user
        document.getElementById("deleteDonorForm").reset();
      }
    } catch (error) {
      document.getElementById("responseMessage").textContent =
        "An error occurred. Please try again.";
    }
  });
