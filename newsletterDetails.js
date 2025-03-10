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

        // Create Edit button for logged-in users
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("edit-btn");

        // Append the edit button to the page (only visible to logged-in users)
        document.getElementById("newsletterContent").appendChild(editButton);

        // Add event listener to edit button
        editButton.addEventListener("click", () => {
          // Allow editing of the title and content fields
          const titleField = document.getElementById("newsletterTitle");
          const contentField = document.getElementById("newsletterContent");

          // Change the elements to editable fields
          titleField.setAttribute("contenteditable", true);
          contentField.setAttribute("contenteditable", true);

          // Change button text to "Save"
          editButton.innerText = "Save";

          // Update the newsletter data on save
          editButton.removeEventListener("click", saveNewsletter); // Remove previous save listener (if exists)
          editButton.addEventListener("click", saveNewsletter);

          function saveNewsletter() {
            // Get the updated content
            const updatedTitle = titleField.textContent;
            const updatedContent = contentField.innerHTML;

            // Save the updated content to localStorage
            const updatedNewsletter = {
              title: updatedTitle,
              content: updatedContent,
            };
            localStorage.setItem(
              "selectedNewsletter",
              JSON.stringify(updatedNewsletter)
            );

            // Make the fields non-editable again
            titleField.setAttribute("contenteditable", false);
            contentField.setAttribute("contenteditable", false);

            // Change button text back to "Edit"
            editButton.innerText = "Edit";
          }
        });
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
};
