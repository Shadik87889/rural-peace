// Get the newsletter title slug from the URL
const urlParams = new URLSearchParams(window.location.search);
const titleSlug = urlParams.get("title");

// Function to fetch and display the newsletter
async function fetchNewsletter() {
  if (!titleSlug) {
    console.error("No newsletter slug provided.");
    document.getElementById("newsletterContent").textContent =
      "No newsletter content to display.";
    return;
  }

  try {
    const response = await fetch(`/newsletters/${titleSlug}`);
    if (!response.ok) {
      throw new Error("Newsletter not found.");
    }

    const newsletter = await response.json();

    // Set the title and content in the HTML
    document.getElementById("newsletterTitle").textContent = newsletter.title;
    document.getElementById("newsletterContent").innerHTML = newsletter.content;

    // Store the newsletter in localStorage for later use (optional)
    localStorage.setItem("selectedNewsletter", JSON.stringify(newsletter));
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    document.getElementById("newsletterContent").textContent =
      "Failed to load newsletter content.";
  }
}

// Call fetch function on page load
fetchNewsletter();

// User authentication and profile display logic
window.onload = function () {
  fetch("/api/user")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn) {
        const user = data.user;

        // Display profile picture
        const profilePic = document.createElement("img");
        profilePic.src = "images/commentor.jpg"; // Default profile pic
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
        log_out.href = "/logout"; // Update link to logout

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
