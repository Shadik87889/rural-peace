// Define the matchMedia function
let cc = gsap.matchMedia();

// Add the media query and animation logic
cc.add("(min-width: 768px)", () => {
  function six() {
    // Target elements
    const firstTitle = document.querySelector(".contact-title");
    const secondTitle = document.querySelector(".home-page-img");
    const paragraph = document.querySelector(".title-sentence .some-text");

    // Set initial styles for a dramatic effect
    gsap.set(".title-sentence", { perspective: 1200 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".home-page-img",
          start: "top 90%",
          end: "top 30%",
          once: true,
          markers: false,
          scrub: false,
        },
      })
      .from(firstTitle, {
        y: -200,
        opacity: 0,
        scale: 1.5,
        rotateX: 60,
        rotateY: 30,
        ease: "expo.out",
        duration: 1.5,
        transformOrigin: "center center",
      })
      .from(
        secondTitle,
        {
          y: 200,
          opacity: 0,
          scale: 1.5,
          rotateX: -60,
          rotateY: -30,
          ease: "expo.out",
          duration: 1.5,
          stagger: 0.3,
          transformOrigin: "center center",
        },
        "-=1.2"
      )
      .from(
        paragraph,
        {
          y: 150,
          opacity: 0,
          scale: 1, // Ensure the paragraph starts at its original size
          rotateX: 10,
          rotateY: 5,
          filter: "blur(20px)",
          ease: "expo.out",
          duration: 1.8,
          transformOrigin: "center center",
        },
        "-=1.5"
      )
      .to(paragraph, {
        filter: "blur(0px)", // Remove blur effect
        duration: 0.3,
        ease: "power1.out",
      })
      .to(
        [firstTitle, secondTitle],
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          transformOrigin: "center center",
          duration: 1,
          ease: "expo.out",
        },
        "-=0.5"
      )
      .to(
        paragraph,
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.6"
      );
  }
  six();
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
cc.add("(max-width: 768px)", () => {
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
  function mobileAnimation() {
    // Animate mail text with fade-in and upward movement
    gsap.fromTo(
      ".mail",
      {
        opacity: 0,
        y: 50,
        scale: 1.2,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mail",
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none none",
          markers: false,
        },
      }
    );

    // Animate method-box with advanced 3D effects
    gsap.utils.toArray(".method-box .method-one").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
          rotateX: 20,
          rotateY: 20,
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 1.5,
          delay: index * 0.2, // Staggered start
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      );
    });
  }
  mobileAnimation();
});

let all_inputs = document.querySelectorAll("input");
let submit_btn = document.querySelector(".submit-btn");
let page3_shadow = document.querySelector(".page3-shadow");
let close_btn = document.querySelector(".close-button");
let text_area = document.querySelector("textarea");
let popup = document.querySelector(".popup");

function isValidInput(input) {
  return input.value.trim().length > 0;
}

function checkFormValidity() {
  let allValid = true;
  all_inputs.forEach((input) => {
    if (!isValidInput(input)) {
      allValid = false;
    }
  });

  if (!isValidInput(text_area)) {
    allValid = false;
  }

  submit_btn.disabled = !allValid;
}

function submitPopup() {
  all_inputs.forEach((i) => {
    i.addEventListener("input", checkFormValidity);
  });
  text_area.addEventListener("input", checkFormValidity);

  submit_btn.addEventListener("click", () => {
    submit_btn.innerHTML = "loading...";
    setTimeout(() => {
      submit_btn.innerHTML = "SUBMIT";
      page3_shadow.classList.add("page-3-shadow");
      popup.classList.add("popup-appear");
      close_btn.addEventListener("click", () => {
        popup.classList.add("popup-close");
        page3_shadow.classList.add("page3-disappear");
        all_inputs.forEach((input) => {
          input.value = "";
        });
        text_area.value = "";
        submit_btn.disabled = true;
      });
    }, 1000);
  });
}

submitPopup();
checkFormValidity(); // Initial check

function socialMediaHoverEffect() {
  let hover__box = document.querySelectorAll(".hover-box");
  let hover__on = document.querySelectorAll(".social-media a");

  hover__on.forEach((hover, index) => {
    let box = hover__box[index]; // Match each hover_on with its corresponding hover_box
    hover.addEventListener("mouseenter", () => {
      box.classList.add("hover-done");
    });
    hover.addEventListener("mouseleave", () => {
      box.classList.remove("hover-done");
    });
  });
}
socialMediaHoverEffect();
//////////////////
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.submissionTime = formatDateTime(new Date());
    fetch("https://rural-peace.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        // Show popup
        document.querySelector(".popup").style.display = "block";
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
function formatDateTime(postTime) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(postTime);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} at ${formattedTime}`;
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
