// Function to set up blood group buttons
function setupBloodGroupButtons() {
  const bloodGroupButtons = document.querySelectorAll(".blood-group");

  bloodGroupButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedBloodGroup = event.target.innerText.trim();
      localStorage.setItem("selectedBloodGroup", selectedBloodGroup);
      window.location.href = "Blood-donor-list";
    });
  });
}

// Call function when the page loads
document.addEventListener("DOMContentLoaded", setupBloodGroupButtons);
let mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
  function six() {
    // Target elements
    const firstTitle = document.querySelector(".title-sentence .first");
    const secondTitle = document.querySelector(".title-sentence .second");
    const paragraph = document.querySelector(".title-sentence .some-text");

    // Set initial styles for a dramatic effect
    gsap.set(".title-sentence", { perspective: 1200 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".title-sentence",
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

mm.add("(max-width: 768px)", () => {
  let all_bg = document.querySelectorAll(".blood-group");
  function six() {
    // Target elements
    const firstTitle = document.querySelector(".title-sentence .first");
    const secondTitle = document.querySelector(".title-sentence .second");
    const paragraph = document.querySelector(".title-sentence .some-text");

    // Set initial styles for a dramatic effect
    gsap.set(".title-sentence", { perspective: 1200 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".title-sentence",
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
  function second_one() {
    const imgSect = document.querySelector(".img-sect");
    const textOne = document.querySelector(".text .one");
    const textTwo = document.querySelector(".text .two");

    // Set initial styles
    gsap.set(imgSect, {
      scale: 1.2,
      opacity: 0,
      y: 100,
      transformOrigin: "center center",
    });

    gsap.set([textOne, textTwo], {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transformOrigin: "center center",
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#sect-two",
        start: "top center", // Start animation when the top of the section reaches the center of the viewport
        end: "bottom top", // End animation when the bottom of the section reaches the top of the viewport
        scrub: 1,
        markers: false,
        once: true, // Ensure the animation happens only once
      },
    });

    // Image animation
    tl.to(imgSect, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
    })
      .to(imgSect, {
        // scale: 1.05, // Bounce effect
        duration: 0.3,
        ease: "back.out(1.2)",
      })
      .to(
        imgSect,
        {
          scale: 1,
          duration: 0.3,
          ease: "back.in(1.2)",
        },
        "-=0.3"
      );

    // Text animation with synchronized timing
    tl.to(textOne, {
      opacity: 1,
      y: 0,
      // scale: 1.05, // Bounce effect
      duration: 1.2,
      ease: "power2.out",
    })
      .to(
        textOne,
        {
          // scale: 1,
          duration: 0.3,
          ease: "back.in(1.2)",
        },
        "-=0.3"
      )
      .to(
        textTwo,
        {
          opacity: 1,
          y: 0,
          // scale: 1.05, // Bounce effect
          duration: 3,
          ease: "power2.out",
        },
        "-=0.5"
      ) // Ensure it starts after textOne's animation
      .to(
        textTwo,
        {
          scale: 0.9,
          duration: 0.3,
          ease: "back.in(1.2)",
        },
        "-=0.3"
      );
  }

  // function second_two() {
  //   const imgSect = document.querySelector(".img-sect");
  //   const textOne = document.querySelector(".text .one");
  //   const textTwo = document.querySelector(".text .two");

  //   // Set initial styles
  //   gsap.set(imgSect, {
  //     scale: 1.2,
  //     opacity: 0,
  //     y: 100,
  //     transformOrigin: "center center",
  //   });

  //   gsap.set([textOne, textTwo], {
  //     opacity: 0,
  //     y: 50,
  //     scale: 1.5, // Start with a larger scale for perspective
  //     z: -500, // Start behind the view
  //     rotationX: 45, // Tilt for 3D effect
  //     rotationY: 0, // No initial horizontal rotation
  //     transformOrigin: "center center",
  //   });

  //   let tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#sect-two",
  //       start: "top center",
  //       end: "bottom top",
  //       scrub: 1,
  //       markers: false,
  //       once: true,
  //     },
  //   });

  //   // Image animation
  //   tl.to(imgSect, {
  //     scale: 1,
  //     opacity: 1,
  //     y: 0,
  //     duration: 1.2,
  //     ease: "power2.out",
  //   })
  //     .to(imgSect, {
  //       duration: 0.3,
  //       ease: "back.out(1.2)",
  //     })
  //     .to(
  //       imgSect,
  //       {
  //         scale: 1,
  //         duration: 0.3,
  //         ease: "back.in(1.2)",
  //       },
  //       "-=0.3"
  //     );

  //   // Text animation with immediate appearance
  //   tl.to(textOne, {
  //     opacity: 1,
  //     y: 0,
  //     scale: 1, // Normalize scale
  //     z: 0, // Bring to final position
  //     rotationX: 0, // Reset 3D rotation
  //     duration: 0.5, // Shortened duration
  //     ease: "power2.out",
  //   }).to(
  //     textTwo,
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1, // Normalize scale
  //       z: 0, // Bring to final position
  //       rotationX: 0, // Reset 3D rotation
  //       duration: 0.5, // Shortened duration
  //       ease: "power2.out",
  //     },
  //     "-=0.5"
  //   ); // Overlap with textOne animation
  // }

  second_one();
  // second_two();

  all_bg.forEach((bg) => {
    // Set initial styles with depth, rotation, and scale effects
    gsap.set(bg, {
      opacity: 0,
      position: "relative",
      top: 80,
      scale: 0.8,
      rotationY: 30, // Adds a 3D rotation effect for more dynamic appearance
      skewX: 10, // Subtle skew for added flair
      filter: "blur(10px)", // Initial blur effect for dramatic reveal
      transformOrigin: "center center",
    });

    // Advanced timeline for a multi-stage, impressive animation
    let bb = gsap.timeline({
      scrollTrigger: {
        trigger: bg,
        start: "top 85%",
        end: "top 60%",
        once: true, // Trigger animation only once
        toggleActions: "play none none none", // Ensure it only plays and doesn't reverse
        markers: false,
      },
    });

    bb.to(bg, {
      top: 0,
      opacity: 1,
      scale: 1.05, // Slight overshoot to make it more dramatic
      rotationY: 0, // Reset 3D rotation smoothly
      skewX: 0, // Reset skew
      filter: "blur(0px)", // Clear blur for a crisp reveal
      ease: "back.out(1.7)", // Strong overshoot easing for stunning effect
      duration: 0.3, // Faster response with punchy feel
    })
      .to(
        bg,
        {
          scale: 1, // Settle back to normal scale
          duration: 0.15,
        },
        "-=0.15"
      ) // Overlapping effect for faster feel
      .to(
        bg,
        {
          backgroundColor: "rgba(255, 0, 127, 0.1)", // Adds subtle background color pulse
          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)", // Strong shadow for visual pop
          duration: 0.2,
        },
        "-=0.2"
      ) // Overlapping again for smoother transition
      .to(
        bg,
        {
          rotationZ: 3, // Add a tiny, final rotation to make it feel dynamic
          duration: 0.1,
        },
        "-=0.1"
      );
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

/////////////////////////////////

/////////////////////////Choooooooooooooooooooooooooossssssssssssssssssssssssseeeeeeeeeeeennnnnn---03/////////////

// mm.add("(max-width: 768px)", () => {
//   let all_bg = document.querySelectorAll(".blood-group");

//   all_bg.forEach((bg, i) => {
//     // Initial setup with 3D rotation, skew, and opacity for a dramatic entry
//     gsap.set(bg, {
//       opacity: 0,
//       position: "relative",
//       top: 150,
//       scale: 0.4, // Small scale for dramatic growth
//       rotationY: -180, // Full Y-axis spin for 3D effect
//       rotationX: 45, // Tilted for perspective
//       skewX: 20, // Skew for dynamic entry
//       filter: "blur(20px)", // Initial blur for soft reveal
//       transformOrigin: "center center",
//     });

//     let bb = gsap.timeline({
//       scrollTrigger: {
//         trigger: bg,
//         start: "top 90%",
//         end: "top 40%",
//         scrub: false,
//         toggleActions: "play none none reverse",
//         markers: false,
//       },
//     });

//     // Phase 1: Dramatic reveal with 3D rotation, blur removal, and smooth scale
//     bb.to(bg, {
//       top: 0,
//       opacity: 1,
//       scale: 1.2, // Slight overshoot for lively feel
//       rotationY: 0, // Spin back to original position
//       rotationX: 0, // Reset tilt for final resting position
//       skewX: 0, // Remove skew for clean look
//       filter: "blur(0px)", // Remove blur for clarity
//       ease: "power3.out", // Smooth, powerful easing
//       duration: 0.7, // Quick but impactful entrance
//     })

//       // Phase 2: Zigzag movement to bring life to the animation
//       .to(
//         bg,
//         {
//           x: i % 2 === 0 ? 30 : -30, // Zigzag motion for alternate boxes
//           y: -30, // Bounce up for dynamic movement
//           ease: "elastic.out(1.2, 0.5)", // Elastic easing for bouncy feel
//           duration: 0.6,
//         },
//         "-=0.4"
//       )

//       // Phase 3: Slight rotation and final scale correction for a polished effect
//       .to(bg, {
//         x: 0, // Reset x position
//         y: 0, // Bring back to original y position
//         scale: 1, // Final scale adjustment to natural size
//         rotationZ: 0, // Subtle tilt correction for balance
//         duration: 0.5,
//         ease: "back.out(1.7)", // Back easing for a smooth finish
//       })

//       // Phase 4: Bring everything to rest with a smooth, still finish
//       .to(bg, {
//         // No more movement, holding the final position
//         scale: 1, // Ensure the box stays at its final size
//         ease: "power2.out", // Gentle easing for the final stillness
//         duration: 0.4, // Brief duration to settle
//       });
//   });
// });

///////////////////////////
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
