window.onload = function () {
  fetch("/api/user")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn) {
        const user = data.user;
        if (
          user._json.email == "mdshadikhossain830@gmail.com" ||
          user._json.email == "org.ruralpeace@gmail.com"
        ) {
          dltBtn.style.display = "block";
        } else {
          dltBtn.style.display = "none";
        }
        // Display profile picture
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
};
