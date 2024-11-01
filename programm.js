// Desktop Animations
let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
  // Only execute this on desktop and larger screens
  console.log("Desktop animations active");

  let headingAnim = gsap.timeline();
  headingAnim.to(".word", {
    top: 0,
    stagger: 0.1,
    opacity: 1,
  });

  headingAnim.to(".heading-para p", {
    top: 0,
    stagger: 0.05,
    opacity: 1,
    delay: 0.3,
  });

  let navAnim = gsap.timeline();
  navAnim.to(".nav-bar", {
    delay: 0.3,
    scale: 1,
    opacity: 1,
    duration: 0.4,
  });
  navAnim.to(".nav-bar", {
    delay: 0.2,
    width: "90%",
    duration: 1.5,
    marginLeft: 0,
  });

  let videoAnim = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#main", // Make sure #main is the correct scroller
      start: "top 0%",
      end: "top -500%",
      pin: true,
      scrub: 2,
    },
  });
  videoAnim.to(".page2 .rotate-box", {
    duration: 1,
    opacity: 1,
    top: 0,
    rotate: "90deg",
  });
  videoAnim.to(".page2 .rotate-box", {
    left: 0,
    rotate: 0,
  });
  videoAnim.to(".page2 .rotate-box", {
    delay: 0.3,
    height: "80%",
    width: "80%",
    duration: 1,
    opacity: 1,
    backgroundColor: "#1e1d1d",
  });
  videoAnim.to(".page2 .rotate-box h1", {
    duration: 0.7,
    opacity: 1,
    scale: 1,
    opacity: 1,
  });
  videoAnim.to(".page2 .rotate-box h1", {
    delay: 0.5,
  });
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

mm.add("(max-width: 768px)", () => {
  gsap.set(".heading .word", {
    position: "relative",
    top: 50,
    opacity: 0,
  });
  gsap.set(".heading-para p", {
    position: "relative",
    top: 20,
    opacity: 0,
  });
  gsap.set(".pt-one", {
    position: "relative",
    top: 50,
    opacity: 0,
  });
  let headingAnim = gsap.timeline();
  headingAnim.to(".word", {
    delay: 0.2,
    top: 0,
    duration: 0.4,
    stagger: 0.2,
    opacity: 1,
  });

  headingAnim.to(
    ".heading-para p",
    {
      top: 0,
      stagger: 0.05,
      duration: 0.4,
      opacity: 1,
      delay: 0.3,
    },
    "<"
  );
  headingAnim.to(
    ".pt-one",
    {
      top: 0,
      duration: 1,
      opacity: 1,
      stagger: 0.2,
    },
    "<"
  );
  let mobileAnim = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      start: "10% 10%",
      end: "10% -85%",
      pin: true,
      scrub: 2,
    },
  });

  mobileAnim.to(".page2 .rotate-box", {
    duration: 1,
    opacity: 1,
    top: 0,
    rotate: "45deg",
  });
  mobileAnim.to(".page2 .rotate-box", {
    left: "0",
    rotate: "0deg",
  });
  mobileAnim.to(".page2 .rotate-box", {
    delay: 0.3,
    height: "80%",
    width: "90%",
    duration: 1,
    opacity: 1,
    backgroundColor: "#333",
  });
  mobileAnim.to(".page2 .rotate-box h1", {
    duration: 0.7,
    opacity: 1,
    scale: 1.3,
    opacity: 1,
  });
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

// Hover Animations (applied universally)
let pt__1__img = document.querySelectorAll(".pt-one-img img");
pt__1__img.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    img.style.height = "41vw";
    img.style.transition = ".5s";
  });
  img.addEventListener("mouseleave", () => {
    img.style.height = "39.5vw";
    img.style.transition = ".5s";
  });
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
