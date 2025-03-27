// newsletterDetails.js

// Retrieve the selected newsletter from localStorage
const selectedNewsletter = JSON.parse(
  localStorage.getItem("selectedNewsletter")
);

// Ensure the newsletter data exists before rendering
if (selectedNewsletter) {
  // Set the title and content in the HTML
  document.getElementById("newsletterTitle").textContent =
    selectedNewsletter.title;
  document.getElementById("newsletterContent").innerHTML =
    selectedNewsletter.content;
} else {
  console.error("No newsletter data found.");
  document.getElementById("newsletterContent").textContent =
    "No newsletter content to display.";
}
window.onload = function () {
  fetch("/api/user")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn) {
        const user = data.user;
        // Display profile picture
        const profilePic = document.createElement("img");
        // profilePic.src = user._json.picture;
        profilePic.src = "images/commentor.jpg";
        profilePic.alt = "Profile Picture";
        profilePic.style.borderRadius = "50%"; // Make it round
        document
          .getElementById("profile-pic-container")
          .appendChild(profilePic);

        // Create user profile box
        let userProfileBox = document.createElement("div");
        userProfileBox.classList.add("profileBox");

        let userName = document.createElement("div");
        userName.classList.add("user-name");
        userName.innerText = user._json.name;

        let logOut = document.createElement("div");
        logOut.classList.add("log-out-btn");

        let log_out = document.getElementById("auth-link");
        log_out.innerText = "Log out";
        document.getElementById("auth-link").href = "/logout"; // Update link to logout

        // Append the logout option
        logOut.appendChild(log_out);
        userProfileBox.appendChild(userName);
        userProfileBox.appendChild(logOut);

        let pageOne = document.querySelector("#page1");
        pageOne.appendChild(userProfileBox);

        // Toggle user profile box visibility on click
        let imgCon = document.querySelector("#profile-pic-container");
        imgCon.addEventListener("click", () => {
          userProfileBox.classList.toggle("userBoxControl");
        });
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
};
//okay
