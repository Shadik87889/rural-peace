function displayDonorList() {
  // Get the selected blood group from the URL if it's present
  const selectedBloodGroup = localStorage.getItem("selectedBloodGroup");
  const donorListContainer = document.querySelector(".list");

  console.log("Selected Blood Group:", selectedBloodGroup); // Check local storage value

  if (!selectedBloodGroup || !donorListContainer) {
    console.log("No selected blood group or donor list container found.");
    return;
  }

  donorListContainer.innerHTML = ""; // Clear existing list

  fetch("https://www.ruralpeace.org/donors")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((donors) => {
      console.log("Donors fetched:", donors); // Log fetched donors

      // Filter donors by the selected blood group
      const filteredDonors = donors.filter(
        (donor) => donor.bloodGroup === selectedBloodGroup
      );

      console.log("Filtered Donors:", filteredDonors); // Log filtered donors

      // Update title
      let title = document.querySelector(".title");
      title.innerHTML = `${selectedBloodGroup} Blood donor list`;

      // Check if there are any filtered donors
      if (filteredDonors.length === 0) {
        donorListContainer.innerHTML =
          "<p class='no-donors-message'>Opps! No donors found for this blood group.</p>";
        return;
      }

      // Create list items
      filteredDonors.forEach((donor) => {
        const listItem = document.createElement("a");
        listItem.href = `Blood-donor-profile?id=${donor.id}`; // Redirect with donor ID in URL
        listItem.classList.add("list-one");

        const donorImage =
          donor.gender === "male"
            ? "images/donor_male.jpg"
            : "images/donor_female.jpg";

        listItem.innerHTML = `
          <div class="donar-img">
            <img src="${donorImage}" alt="Donor Image" />
          </div>
          <div class="donar-name-address">
            <div class="donar-name">${donor.name}</div>
            <div class="donar-address">${donor.address}</div>
          </div>
        `;

        donorListContainer.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.addEventListener("DOMContentLoaded", displayDonorList);

let hh = gsap.matchMedia();
hh.add("(min-width: 768px)", () => {
  function allFn() {
    gsap.registerPlugin(ScrollTrigger);

    function navBarFn() {
      const menuBtn = document.querySelector(".menu .menuBtn");
      const closeBtn = document.querySelector(".mobile-menu-bar .closeBtn");
      const mobileMenu = document.querySelector(".mobile-menu-bar");

      function openMenu() {
        gsap.set(mobileMenu, {
          display: "flex",
          opacity: 0,
          scale: 0.3,
          rotateX: -30,
          rotateY: 30,
          y: "100vh",
          zIndex: 1000,
          transformOrigin: "center center",
          perspective: 1500,
        });

        gsap.to(mobileMenu, {
          opacity: 1,

          scale: 1,
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.6, // Reduced duration for faster opening
          ease: "expo.out",
          onComplete: () => {
            // Animations for explore links
            gsap.fromTo(
              ".mobile-menu-bar .explore a",
              {
                opacity: 0,
                y: -50,
                scale: 0.8,
                rotateX: -30,
                filter: "blur(20px)",
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                filter: "blur(0)",
                stagger: 0.1,
                duration: 0.8,
                ease: "power4.out",
              }
            );

            // Animations for sub links
            gsap.fromTo(
              ".mobile-menu-bar .sub a",
              {
                opacity: 0,
                x: -50,
                scale: 0.8,
                rotateX: -30,
                filter: "blur(20px)",
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                rotateX: 0,
                filter: "blur(0)",
                stagger: 0.1,
                duration: 0.8,
                ease: "power4.out",
              }
            );

            // Animation for the .menu-video section
            gsap.fromTo(
              ".menu-video",
              {
                opacity: 0,
                scale: 0.8,
                y: -100, // Moves the video from above
                rotateX: -15,
                filter: "blur(20px)",
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                filter: "blur(0)",
                duration: 1,
                ease: "back.out(1.5)", // Bouncy effect for modern feel
              }
            );

            // Animation for .org-name (organization name)
            gsap.fromTo(
              ".mobile-menu-bar .org-name",
              {
                opacity: 0,
                scale: 0.5,
                x: 100, // Moves from the right
                rotateY: 30,
              },
              {
                opacity: 1,
                scale: 1,
                x: 0,
                rotateY: 0,
                duration: 1,
                ease: "power3.out",
              }
            );
          },
        });
      }

      function closeMenu() {
        // Animations for explore links (closing)
        gsap.to(".mobile-menu-bar .explore a", {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotateX: 30,
          filter: "blur(20px)",
          stagger: 0.1,
          duration: 0.6,
          ease: "power4.in",
        });

        // Animations for sub links (closing)
        gsap.to(".mobile-menu-bar .sub a", {
          opacity: 0,
          x: 50,
          scale: 0.8,
          rotateX: 30,
          filter: "blur(20px)",
          stagger: 0.1,
          duration: 0.6,
          ease: "power4.in",
        });

        // Animation for the .menu-video section (closing)
        gsap.to(".menu-video", {
          opacity: 0,
          scale: 0.8,
          y: -100, // Moves the video upwards
          rotateX: -15,
          filter: "blur(20px)",
          duration: 0.8,
          ease: "back.in(1.5)",
        });

        // Animation for .org-name (organization name) (closing)
        gsap.to(".mobile-menu-bar .org-name", {
          opacity: 0,
          scale: 0.5,
          x: 100, // Moves back to the right
          rotateY: 30,
          duration: 0.8,
          ease: "power3.in",
        });

        // Closing animation for the mobile menu itself
        gsap.to(mobileMenu, {
          opacity: 0,
          scale: 0.3,
          rotateX: -30,
          rotateY: 30,
          y: "100vh",
          duration: 0.8,
          ease: "power4.in",
          onComplete: () => {
            mobileMenu.style.display = "none";
          },
        });
      }

      menuBtn.addEventListener("click", openMenu);
      closeBtn.addEventListener("click", closeMenu);
    }

    navBarFn();
  }
  allFn();
});
hh.add("(max-width: 768px)", () => {
  function allFn() {
    gsap.registerPlugin(ScrollTrigger);

    function navBarFn() {
      const menuBtn = document.querySelector(".menu .menuBtn");
      const closeBtn = document.querySelector(".mobile-menu-bar .closeBtn");
      const mobileMenu = document.querySelector(".mobile-menu-bar");

      function openMenu() {
        gsap.set(mobileMenu, {
          display: "flex",
          opacity: 0,
          scale: 0.5,
          y: "100vh",
          zIndex: 1000,
          transformOrigin: "center center",
          perspective: 1200,
        });

        gsap.to(mobileMenu, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          onComplete: () => {
            gsap.fromTo(
              ".mobile-menu-bar .explore a",
              {
                opacity: 0,
                y: -50,
                scale: 0.8,
                rotateX: -30,
                filter: "blur(20px)",
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                filter: "blur(0)",
                stagger: 0.1,
                duration: 0.8,
                ease: "power4.out",
              }
            );

            gsap.fromTo(
              ".mobile-menu-bar .sub a",
              {
                opacity: 0,
                x: -50,
                scale: 0.8,
                rotateX: -30,
                filter: "blur(20px)",
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                rotateX: 0,
                filter: "blur(0)",
                stagger: 0.1,
                duration: 0.8,
                ease: "power4.out",
              }
            );
          },
        });
      }

      function closeMenu() {
        gsap.to(".mobile-menu-bar .explore a", {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotateX: 30,
          filter: "blur(20px)",
          stagger: 0.1,
          duration: 0.6,
          ease: "power4.in",
        });

        gsap.to(".mobile-menu-bar .sub a", {
          opacity: 0,
          x: 50,
          scale: 0.8,
          rotateX: 30,
          filter: "blur(20px)",
          stagger: 0.1,
          duration: 0.6,
          ease: "power4.in",
        });

        gsap.to(mobileMenu, {
          opacity: 0,
          scale: 0.5,
          y: "100vh",
          duration: 1,
          ease: "power4.in",
          onComplete: () => {
            mobileMenu.style.display = "none";
          },
        });
      }

      menuBtn.addEventListener("click", openMenu);
      closeBtn.addEventListener("click", closeMenu);
    }

    navBarFn();
  }
  allFn();
});

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
