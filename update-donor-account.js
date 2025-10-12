let originalData = {};

const fetchDonorInfo = async () => {
  const email = document.getElementById("email").value;
  const secretCode = document.getElementById("secretCode").value;

  if (email && secretCode) {
    const response = await fetch(`/donor/${email}/${secretCode}`);
    if (response.ok) {
      const donor = await response.json();
      document.getElementById("name").value = donor.name;
      document.getElementById("phone").value = donor.phone;
      document.getElementById("address").value = donor.address;
      document.getElementById("bloodGroup").value = donor.bloodGroup;
      document.getElementById("age").value = donor.age;
      document.getElementById("gender").value = donor.gender;

      // Store the original data for comparison
      originalData = { ...donor };

      // Show the update info section
      document.querySelector(".update-info").style.display = "flex";
      toggleUpdateButton();
    } else {
      clearFields();
      alert("Invalid email or secret code. Please try again.");
    }
  }
};

const clearFields = () => {
  document.getElementById("email").value = "";
  document.getElementById("secretCode").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("bloodGroup").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "male";
  originalData = {};
  toggleUpdateButton();
};

const toggleUpdateButton = () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const bloodGroup = document.getElementById("bloodGroup").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  // Enable the button only if all fields are filled
  const allFilled = name && phone && address && bloodGroup && age && gender;

  document.getElementById("updateButton").disabled = !allFilled;

  // Show message if not all fields are filled
  const messageElement = document.getElementById("message");
  if (!allFilled) {
    messageElement.textContent = "Please fill in all the information.";
    messageElement.style.color = "red";
  } else {
    messageElement.textContent = "";
  }
};

// Attach input event listeners to fields
const inputs = document.querySelectorAll(
  ".update-info input, .update-info select"
);
inputs.forEach((input) => {
  input.addEventListener("input", toggleUpdateButton);
});

document.getElementById("retrieveButton").onclick = fetchDonorInfo;

const updateDonorInfo = async () => {
  const email = document.getElementById("email").value;
  const secretCode = document.getElementById("secretCode").value;
  const updateData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    bloodGroup: document.getElementById("bloodGroup").value,
    age: Number(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
  };

  const response = await fetch("/updateDonor", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, secretCode, updateData }),
  });

  if (response.ok) {
    alert("Donor account updated successfully!");
    clearFields();
    document.querySelector(".update-info").style.display = "none";
  } else {
    alert(
      "Failed to update donor information: " + (await response.json()).message
    );
  }
};

document.getElementById("updateButton").onclick = updateDonorInfo;
