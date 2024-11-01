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
