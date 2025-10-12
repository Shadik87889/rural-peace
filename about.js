let ll = gsap.matchMedia();
ll.add("(min-width: 768px)", () => {
  let headingAnim = gsap.timeline();
  headingAnim.to(".word", {
    top: 0,
    stagger: 0.1,
    opacity: 1,
  });
  gsap.to(".container", {
    opacity: 1,
    scale: 1,
    delay: 0.5,
    duratoin: 1,
  });
  gsap.to("hr", {
    width: "70%",
    delay: 0.8,
    duratoin: 4,
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
ll.add("(max-width: 768px)", () => {
  function mobileAnimation() {
    // Animate heading words with advanced 3D effect
    gsap.fromTo(
      ".total-page .heading .word",
      {
        opacity: 0,
        y: -200,
        scale: 0.5,
        rotateX: 90,
        rotateY: 60,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "back.out(1.7)",
      }
    );
    // Animate .an-img with a sophisticated zoom and parallax effect
    gsap.fromTo(
      ".an-img",
      {
        scale: 1.5,
        y: 50,
        opacity: 0,
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(".an-img img p", {
            scale: 1.05,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
          });
        },
      }
    );
    // Animate .text-big-img with a smooth, high-impact reveal
    gsap.fromTo(
      ".text-big-img p",
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
      }
    );
  }
  // Trigger the animation
  mobileAnimation();
  // function superImpressive3DAnimation() {
  //   // Target elements
  //   const heading = document.querySelector(".total-page .heading");
  //   const image = document.querySelector(".an-img");
  //   const textBigImg = document.querySelector(".text-big-img");
  //   // Set initial 3D styles
  //   gsap.set([heading, image, textBigImg], {
  //     opacity: 0,
  //     y: 100,
  //     scale: 1.5,
  //     z: -300,
  //     rotationX: -30,
  //     rotationY: 30,
  //     transformOrigin: "center center",
  //   });
  //   // Create a GSAP timeline
  //   const tl = gsap.timeline({
  //     defaults: { ease: "power3.out", duration: 1.2 },
  //   });
  //   // Animation sequence
  //   tl
  //     // Heading animation
  //     .to(heading, {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1,
  //       z: 0,
  //       rotationX: 0,
  //       rotationY: 0,
  //       transformOrigin: "center center",
  //       onStart: () => {
  //         gsap.fromTo(
  //           heading,
  //           { scale: 0.8, rotationY: -90, z: -500 },
  //           {
  //             scale: 1,
  //             rotationY: 0,
  //             z: 0,
  //             ease: "back.out(1.7)",
  //             duration: 1.2,
  //           }
  //         );
  //       },
  //     })
  //     // Image animation
  //     .to(
  //       image,
  //       {
  //         opacity: 1,
  //         y: 0,
  //         scale: 1,
  //         z: 0,
  //         rotationX: 0,
  //         rotationY: 0,
  //         transformOrigin: "center center",
  //       },
  //       "-=1"
  //     ) // Slight overlap with heading for continuity
  //     // TextBigImg animation
  //     .to(
  //       textBigImg,
  //       {
  //         opacity: 1,
  //         y: 0,
  //         scale: 1,
  //         z: 0,
  //         rotationX: 0,
  //         rotationY: 0,
  //         transformOrigin: "center center",
  //       },
  //       "-=1"
  //     ); // Slight overlap with image for continuity
  // }
  // superImpressive3DAnimation();
  // function mobileAnimation() {
  //   // Animate heading words with a unique 3D effect
  //   gsap.fromTo(
  //     ".total-page .heading .word",
  //     {
  //       opacity: 0,
  //       y: -150,
  //       scale: 0.6,
  //       rotateX: 80,
  //       rotateY: 40,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1,
  //       rotateX: 0,
  //       rotateY: 0,
  //       stagger: 0.3,
  //       duration: 1.2,
  //       ease: "power3.out",
  //     }
  //   );
  //   // Animate .an-img with a sophisticated zoom and parallax effect, without looping
  //   gsap.fromTo(
  //     ".an-img",
  //     {
  //       scale: 1.5,
  //       y: 50,
  //       opacity: 0,
  //     },
  //     {
  //       scale: 1,
  //       y: 0,
  //       opacity: 1,
  //       duration: 1.2,
  //       ease: "power3.out",
  //     }
  //   );
  //   // Animate .text-big-img with a smooth, high-impact reveal
  //   gsap.fromTo(
  //     ".text-big-img",
  //     {
  //       opacity: 0,
  //       y: 100,
  //       scale: 0.8,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1,
  //       duration: 1.5,
  //       ease: "expo.out",
  //     }
  //   );
  // }
  // // Trigger the animation
  // mobileAnimation();

  // function mobileAnimation() {
  //   // Animate heading words with a high-impact 3D effect
  //   gsap.fromTo(
  //     ".total-page .heading .word",
  //     {
  //       opacity: 0,
  //       y: 150,
  //       scale: 0.6,
  //       rotateX: 45,
  //       rotateY: 45,
  //       transformPerspective: 1500,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1,
  //       rotateX: 0,
  //       rotateY: 0,
  //       stagger: 0.1,
  //       duration: 1.5,
  //       ease: "back.out(1.7)",
  //     }
  //   );

  //   // Animate .an-img with a smooth zoom effect
  //   gsap.fromTo(
  //     ".an-img",
  //     {
  //       scale: 1.4,
  //       y: 40,
  //       opacity: 0,
  //     },
  //     {
  //       scale: 1,
  //       y: 0,
  //       opacity: 1,
  //       duration: 1.2,
  //       ease: "power2.out",
  //     }
  //   );

  //   // Animate .text-big-img with a dramatic entrance
  //   gsap.fromTo(
  //     ".text-big-img",
  //     {
  //       opacity: 0,
  //       y: 100,
  //       scale: 0.8,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1,
  //       duration: 1.5,
  //       ease: "expo.out",
  //     }
  //   );
  // }

  // // Trigger the animation
  // mobileAnimation();

  ///////////////////////////page2

  function second_one() {
    const imgSect = document.querySelector(".text-big-img .big-image");

    // Set initial styles
    gsap.set(imgSect, {
      scale: 1.2,
      opacity: 0,
      y: 100,
      transformOrigin: "center center",
    });

    let tli = gsap.timeline({
      scrollTrigger: {
        trigger: ".text-big-img",
        start: "top center",
        end: "bottom top",
        scrub: 1,
        markers: false,
        once: true,
      },
    });

    // Image animation
    tli
      .to(imgSect, {
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
  }
  second_one();

  ////////////////////3rd page/
  function thirdPageAnim() {
    // Animate help text with fade-in and upward movement
    gsap.fromTo(
      ".help-text",
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
          trigger: ".help-text",
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none none",
          markers: false,
        },
      }
    );

    // Animate three flex items with advanced 3D effects
    gsap.utils.toArray(".three-flex-items .flex-col").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          scale: 0.8,
          y: 100,
          rotateX: -30,
          rotateY: -30,
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 1.5,
          delay: index * 0.2, // Staggering effect
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

    // Advanced animation for individual flex-col items
    gsap.utils.toArray(".three-flex-items .flex-col").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          scale: 0.9,
          y: 50,
          rotateX: 20,
          rotateY: 20,
          transformPerspective: 1500,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 1.5,
          delay: index * 0.2, // Staggered start
          ease: "back.out(1.7)",
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
  thirdPageAnim();
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

        console.log(user._json.picture);
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
