function updateDonorProfile(donor) {
  // Update the donor profile page with the donor data
  const donorPic = document.querySelector(".donor_pic img");
  const donorName = document.querySelector(".donor_name");
  const bloodType = document.querySelector(".blood-type h1");
  const donorDetailsBox = document.querySelectorAll(".donor_details_box");
  const donorImage =
    donor.gender === "male"
      ? "images/donor_male.jpg"
      : "images/donor_female.jpg";
  donorPic.src = donorImage;
  if (donorName) {
    donorName.textContent = donor.name;
    if (donor.name.length > 13) {
      donorName.style.fontSize = "4vw"; // Adjust the font size if the name is too long
    } else {
      donorName.style.fontSize = ""; // Reset to the original font size if it's shorter
    }
  }
  if (bloodType) bloodType.textContent = donor.bloodGroup;
  if (donorDetailsBox.length > 0) {
    donorDetailsBox[0].children[1].textContent = donor.phone;
    donorDetailsBox[1].children[1].textContent = donor.address;
    donorDetailsBox[2].children[1].innerHTML = `<a href="mailto:${donor.email}"><img class="gmail_logo" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Email" /></a>`;
    donorDetailsBox[3].children[1].textContent = donor.age;
  }
}

function newOne() {
  const urlParams = new URLSearchParams(window.location.search);
  const donorId = urlParams.get("id");
  console.log(donorId);
  fetch("https://ruralpeace.org/donors")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((donors) => {
      console.log("Donors fetched:", donors); // Log fetched donors
      if (donorId) {
        const donor = donors.find((donor) => donor.id === donorId);
        if (donor) {
          updateDonorProfile(donor);
        } else {
          console.error("Donor not found");
        }
      } else {
        console.error("No donor ID provided");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.addEventListener("DOMContentLoaded", newOne);
