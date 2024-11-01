let nn = gsap.matchMedia();

// For larger screens (min-width: 768px)
nn.add("(min-width: 768px)", () => {
  let page_3_all = document.querySelectorAll(".one-page");

  page_3_all.forEach((pages) => {
    let img_part = pages.querySelector(".img-part");
    let issues = pages.querySelector(".issues-details");

    // Set initial states
    gsap.set(img_part, {
      rotate: "5deg",
      scale: 0.9, // Slightly scale down initially
      x: -100,
      y: 200, // Move down for subtle parallax effect
    });

    gsap.set(issues, {
      x: 200, // Move text out of view
      opacity: 0,
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: pages,
        scroller: "#main",
        start: "top bottom",
        end: "bottom 80%",
        markers: false,
        scrub: 0.5, // Smoother, slower scrub
      },
    });

    // Image animation with parallax effect
    tl.to(
      img_part,
      {
        rotate: 0,
        scale: 1.05, // Slight overshoot for dynamic effect
        opacity: 1,
        x: 0, // Bringing the image into view
        y: 0,
        duration: 2.5,
        ease: "expo.inOut", // Smoother easing for maximum smoothness
      },
      "-=2.0"
    );

    // Text (issues) animation with smooth delay
    tl.to(
      issues,
      {
        x: 0, // Moving into view
        opacity: 1,
        duration: 2,
        ease: "power4.inOut",
      },
      "-=2.0"
    ); // Overlap for smoother transition
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

// For smaller screens (max-width: 767px)
nn.add("(max-width: 767px)", () => {
  let page_3_all = document.querySelectorAll(".one-page");
  page_3_all.forEach((pages) => {
    let img_part = pages.querySelector(".img-part");
    let issues = pages.querySelector(".issues-details");

    // Set initial states
    gsap.set(img_part, {
      top: 100, // Higher start position for dramatic parallax effect
      opacity: 0,
      scale: 0.85,
      y: 50, // Adding parallax-like effect for mobile
    });

    gsap.set(issues, {
      top: 100,
      opacity: 0,
      x: -100, // Text starts from the left
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: pages,
        start: "top 85%",
        end: "top 10%",
        scrub: 1,
        markers: false,
      },
    });

    // Image animation with parallax effect on mobile
    tl.to(img_part, {
      top: 0,
      opacity: 1,
      scale: 1.05, // Slight overshoot for smooth animation
      y: 0, // Bringing image into place
      duration: 2.5,
      ease: "power4.inOut",
    });

    // Text animation for mobile
    tl.to(
      issues,
      {
        x: 0, // Moving into view
        top: 0,
        opacity: 1,
        duration: 2.5,
        ease: "power4.inOut",
      },
      "-=1.8"
    ); // Overlap timing for seamless experience
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
