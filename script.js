let locoScroll = null; // Store the Locomotive Scroll instance globally

function initLocomotiveScroll() {
  if (window.innerWidth >= 768) {
    // Initialize Locomotive Scroll only if it's not a mobile device
    locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
      lerp: 0.05,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }
}

function destroyLocomotiveScroll() {
  if (locoScroll) {
    locoScroll.destroy();
    locoScroll = null; // Clear the instance
  }
}

function checkViewport() {
  // const menuBtn = document.querySelector(".menu .menuBtn");
  // const closeBtn = document.querySelector(".mobile-menu-bar .closeBtn");
  // menuBtn.addEventListener("click", () => {
  //   destroyLocomotiveScroll();
  // });
  // closeBtn.addEventListener("click", () => {
  //   initLocomotiveScroll();
  // });
  if (window.innerWidth < 768) {
    destroyLocomotiveScroll(); // Destroy on mobile
  } else {
    initLocomotiveScroll(); // Initialize on desktop
  }
}

// Initial check and setup
checkViewport();

// Re-check on resize

/////////////////////////
const $card = document.querySelectorAll(".card");
let bounds;
$card.forEach((card) => {
  function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    card.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 5}deg
    )
  `;

    card.querySelector(".glow").style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      #ffffff55,
      #0000000f
    )
  `;
  }
  card.addEventListener("mouseenter", () => {
    bounds = card.getBoundingClientRect();
    document.addEventListener("mousemove", rotateToMouse);
  });

  card.addEventListener("mouseleave", () => {
    document.removeEventListener("mousemove", rotateToMouse);
    card.style.transform = "";
    card.style.background = "";
  });
});

function shareBtnActivate(share) {
  document.getElementById(`${share}`).addEventListener("click", function () {
    const shareOptions = document.getElementById("share-options");
    if (shareOptions.style.display === "none") {
      shareOptions.style.display = "block";
    } else {
      shareOptions.style.display = "none";
    }
  });

  // Use both click and touchstart for mobile devices
  const shareEvents = ["click", "touchstart"];

  shareEvents.forEach((event) => {
    document
      .getElementById("share-facebook")
      .addEventListener(event, function () {
        const url = encodeURIComponent(window.location.href);
        window.location.href = `https://www.facebook.com/sharer.php?u=${url}`;
      });

    document
      .getElementById("share-twitter")
      .addEventListener(event, function () {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.location.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      });

    document
      .getElementById("share-linkedin")
      .addEventListener(event, function () {
        const url = encodeURIComponent(window.location.href);
        window.location.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      });

    document.getElementById("share-email").addEventListener(event, function () {
      const subject = encodeURIComponent(document.title);
      const body = encodeURIComponent(
        `Check out this page: ${window.location.href}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
  });
}

shareBtnActivate("share-button");

let ss = gsap.matchMedia();
ss.add("(min-width: 768px)", () => {
  function preLoader() {
    window.addEventListener("load", function () {
      // Check if the current page is index.html
      if (window.location.pathname.endsWith("index.html")) {
        // Create an audio element and preload the sound
        const audio = new Audio(
          "sound-effect/cinematic-intro-3-40041 (mp3cut.net).mp3"
        );
        audio.preload = "auto";
        const letters = document.querySelectorAll(".letter");
        const preloader = document.getElementById("preloader");
        const main = document.getElementById("main");

        // Attempt to play the audio automatically
        const playAudio = () => {
          audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
          });
        };

        // Play audio if allowed
        playAudio();

        // GSAP timeline animation
        const timeline = gsap.timeline({
          defaults: { duration: 1.2, ease: "power4.out" },
        });

        // Stage 1: Powerful 3D entry with scaling and rotation
        timeline
          .fromTo(
            letters,
            {
              opacity: 0,
              scale: 0,
              rotationX: 360,
              rotationY: 360,
              translateZ: 1000,
              filter: "blur(20px)",
            },
            {
              opacity: 1,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              translateZ: 0,
              filter: "blur(0px)",
              stagger: {
                each: 0.05,
                from: "center",
              },
              ease: "elastic.out(1, 0.75)",
            }
          )
          .to(letters, {
            scale: 1.5,
            duration: 0.8,
            rotationX: 180,
            rotationY: 180,
            translateZ: 1500,
            ease: "power3.inOut",
            stagger: {
              each: 0.05,
              from: "random",
            },
          })
          .to(letters, {
            scale: 0.5,
            duration: 1,
            rotationX: -360,
            rotationY: 720,
            translateZ: -2000,
            opacity: 0.5,
            ease: "power4.inOut",
            stagger: {
              each: 0.05,
              from: "end",
            },
          })
          .to(letters, {
            opacity: 0,
            scale: 0.2,
            rotationX: 720,
            rotationY: 720,
            translateZ: -3000,
            ease: "power4.in",
            filter: "blur(50px)",
            stagger: {
              each: 0.05,
              from: "start",
            },
            duration: 1.2,
          })
          .to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              preloader.style.display = "none";
              main.style.display = "block";
            },
          });
      }
    });
  }
  preLoader();

  function page1Anim() {
    // Register GSAP
    gsap.registerPlugin();

    // Main Timeline
    const mainTimeline = gsap.timeline({
      defaults: { ease: "power4.out", duration: 2.5 },
      repeat: 0,
    });

    // Step 1: Wall Image - Full 3D Entrance with Perspective
    mainTimeline
      .fromTo(
        ".wall-image img",
        { scale: 3, rotateX: 90, opacity: 0, transformPerspective: 1500 },
        {
          scale: 1,
          rotateX: 0,
          opacity: 1,
          duration: 3,
          ease: "power4.out",
          transformPerspective: 1500,
          transformOrigin: "center center",
        }
      )
      .fromTo(
        ".wall-image img",
        { filter: "blur(30px)" },
        { filter: "blur(0px)", duration: 2, ease: "power4.out" },
        "-=2"
      );

    // Step 2: Typography-1 - 3D Flip and Expand
    mainTimeline.fromTo(
      ".typography-1",
      {
        y: 200,
        opacity: 0,
        scale: 0.4,
        rotateX: 90,
        transformPerspective: 1200,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 2.5,
        ease: "back.out(2)",
        transformPerspective: 1200,
        transformOrigin: "center center",
        onComplete: () =>
          gsap.to(".typography-1", {
            rotateX: 10,
            duration: 1.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          }),
      },
      "-=2"
    );

    // Step 3: Typography-2 - Complex 3D Rotation and Scaling
    mainTimeline.fromTo(
      ".typography-2",
      {
        scale: 0.3,
        opacity: 0,
        rotateY: 180,
        rotateX: 180,
        transformPerspective: 1500,
      },
      {
        scale: 0.9,
        opacity: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 3,
        ease: "elastic.out(1, 0.6)",
        transformPerspective: 1500,
        transformOrigin: "center center",
        onComplete: () =>
          gsap.to(".typography-2", {
            scale: 1,
            rotateY: 10,
            duration: 1.5,
            // yoyo: true,
            // repeat: 1,
            ease: "power1.inOut",
          }),
      },
      "-=2"
    );
    mainTimeline.fromTo(
      ".description",
      {
        opacity: 1,
      },
      {
        opacity: 1,
      }
    );
    // Step 4: Gradient - 3D Perspective Shift and Fade
    mainTimeline.fromTo(
      ".gradient",
      { opacity: 0.8, scale: 1.2, transformPerspective: 1000 },
      {
        opacity: 0.6,
        scale: 1,
        rotateX: 0,
        duration: 2.5,
        ease: "power4.out",
        transformPerspective: 1000,
        transformOrigin: "center center",
        onComplete: () =>
          gsap.to(".gradient", {
            // rotateX: -10,
            duration: 1.5,
            // repeat: 1,
            ease: "power1.inOut",
          }),
      },
      "-=2"
    );

    // Enhanced Animation for .g-pt
    gsap.fromTo(
      ".g-pt",
      {
        scale: 1,
        // rotateX: 360,
        // rotateY: 360,
        opacity: 0,
        y: 400,
        transformPerspective: 1500,
      },
      {
        scale: 0.9,
        // rotateX: 0,
        // rotateY: 0,
        opacity: 1,
        y: 30,
        duration: 3,
        ease: "power4.out",
        transformPerspective: 1500,
        transformOrigin: "center center",
        onComplete: () =>
          gsap.to(".g-pt", {
            scale: 1,
            y: 0,
            // rotateY: 10,
            duration: 1.5,
            // repeat: -1,
            ease: "power2.inOut",
          }),
      }
    );

    let anim = gsap.timeline({
      scrollTrigger: {
        trigger: ".description",
        start: "top 85%",
        end: "top 50%",
        scrub: 0.4,
      },
    });
    gsap.set(".description h1 div", {
      y: 100,
      opacity: 0,
    });
    anim.to(".description h1 div", {
      y: 0,
      duration: 1,
      opacity: 1,
      stagger: 0.1,
    });
  }

  page1Anim();
  function secondPageAnim() {
    let secondPageTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        start: "top 0%",
        end: "top -340%",
        pin: true,
        scrub: 2,
      },
    });
    secondPageTrigger.to(".text-effect .word", {
      transform: "perspective(0) rotateX(0) rotateY(0)",
      scale: 1,
      left: 0,
      top: 0,
      duration: 2,
      opacity: 1,
      delay: 0.3,
    });

    secondPageTrigger.to(
      "#main",
      {
        backgroundColor: "#131212",
        duration: 1,
      },
      "time"
    );
    secondPageTrigger.to(".text-effect .word", {
      delay: 0.1,
    });
  }

  // function thirdPageAnim() {
  //   let thirdPageTrigger = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#page3",
  //       scroller: "#main",
  //       start: "top 0%",
  //       end: "top -300%",
  //       pin: true,
  //       scrub: 1,
  //     },
  //   });

  //   thirdPageTrigger.to(
  //     ".third-page-img-box",
  //     {
  //       delay: 1.2,
  //       x: -2000,
  //       duration: 4,
  //     },
  //     "same"
  //   );
  //   thirdPageTrigger.to(
  //     "#main",
  //     {
  //       backgroundColor: "#00000",
  //       duration: 4,
  //     },
  //     "same"
  //   );
  // }
  function fourthPageAnim() {
    let fourthPageTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: ".three-images",
        scroller: "#main",
        start: "10% 100%",
        end: "29% 40%",
        scrub: 1,
      },
    });
    fourthPageTrigger.to(".g", {
      opacity: 0.6,
      duration: 1,
    });
  }
  secondPageAnim();
  fourthPageAnim();
  // thirdPageAnim();
  /////////////////////
  // function page3OtherAnim() {
  //   let fade = document.querySelectorAll(".fade");
  //   let page3AllImages = document.querySelectorAll(".third-page-img-box img");
  //   let imgs = document.querySelector("#page3");
  //   let hover = document.querySelector(".scroll-effect");
  //   fade.forEach((shadow) => {
  //     shadow.addEventListener("mouseenter", () => {
  //       gsap.to(shadow, {
  //         opacity: 0,
  //         duration: 0.5,
  //       });
  //     });
  //     shadow.addEventListener("mouseleave", () => {
  //       gsap.to(shadow, {
  //         opacity: 1,
  //         duration: 0.5,
  //       });
  //     });
  //   });
  //   imgs.addEventListener("mouseenter", () => {
  //     gsap.to(hover, {
  //       scale: 1,
  //       opacity: 1,
  //     });
  //   });
  //   imgs.addEventListener("mouseleave", () => {
  //     gsap.to(hover, {
  //       scale: 0,
  //       opacity: 0,
  //     });
  //   });
  //   imgs.addEventListener("mousemove", (dets) => {
  //     gsap.to(hover, {
  //       left: dets.x,
  //       top: dets.y,
  //     });
  //   });
  // }

  //////////////////////
  function desAnim() {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".description",
        scroller: "#main",
        start: "top 75%",
        end: "top 30%",
        scrub: 1,
      },
    });
    tl.to(".description h1 div", {
      y: -50,
      opacity: 1,
      stagger: 0.2,
      duration: 1.5,
    });
  }
  desAnim();
  //////////////////////

  // let allPage5 = document.querySelectorAll("#page5 .page-1");

  let mouseIcon = document.querySelector(".mouseIcon");
  let totalPage = document.querySelector("#page4");
  totalPage.addEventListener("mouseenter", () => {
    gsap.to(mouseIcon, {
      scale: 1,
      opacity: 1,
    });
  });
  totalPage.addEventListener("mouseleave", () => {
    gsap.to(mouseIcon, {
      scale: 0,
      opacity: 0,
    });
  });
  totalPage.addEventListener("mousemove", (dets) => {
    gsap.to(mouseIcon, {
      left: dets.x,
      top: dets.y,
    });
  });
  //////////////////////
  let page_4_all = document.querySelectorAll(".page-1");
  page_4_all.forEach((pages) => {
    let text_part = pages.querySelector(".text-part");
    let card_img = pages.querySelector(".card");
    gsap.set(text_part, {
      xPercent: -200,
      opacity: 0,
    });
    gsap.set(card_img, {
      xPercent: 100,
      opacity: 0,
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        scroller: "#main",
        trigger: pages,
        start: "top bottom",
        end: "bottom 90%",
        scrub: 0.2,
      },
    });
    tl.to(
      text_part,
      {
        xPercent: 0,
        opacity: 1,
      },
      "<"
    );
    tl.to(
      card_img,
      {
        xPercent: 0,
        opacity: 1,
      },
      "<"
    );
  });

  ///////////////////////////
  function page7Anim() {
    let page7Trigger = gsap.timeline({
      scrollTrigger: {
        scroller: "#main",
        trigger: "#page7",
        start: "top 0%",
        end: "top -100%",
        pin: true,
        scrub: 1,
      },
    });
    page7Trigger.to(
      ".page-7-video",
      {
        height: "100%",
        width: "100%",
        duratoin: 1,
      },
      "anim"
    );
    page7Trigger.to(
      ".rural",
      {
        fontSize: "15vw",
        duratoin: 1,
        left: "12vw",
      },
      "anim"
    );
    page7Trigger.to(
      ".peace",
      {
        fontSize: "15vw",
        duratoin: 1,
        right: "12vw",
      },
      "anim"
    );
    page7Trigger.to(".rural", {
      delay: 0.1,
    });
  }
  page7Anim();
  ////////////////////////////
  function footerAnim() {
    let footerTrigger = gsap.timeline({
      scrollTrigger: {
        scroller: "#main",
        trigger: "#footer",
        start: "50% 67%",
        end: "40% 0%",
        scrub: 2,
      },
    });
    footerTrigger.to(".membership-dev", {
      rotate: "2deg",
      duration: 1,
    });
    footerTrigger.to(
      ".org-1",
      {
        left: 0,
        duration: 3,
        opacity: 1,
      },
      "on"
    );
    footerTrigger.to(
      ".org-2",
      {
        right: 0,
        duration: 3,
        opacity: 1,
      },
      "on"
    );
  }

  footerAnim();
  //////////////////////////////
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
ss.add("(max-width: 768px)", () => {
  //////////////////////

  function preLoader() {
    window.addEventListener("load", function () {
      // Check if the current page is index.html
      if (window.location.pathname.endsWith("index.html")) {
        // Create an audio element and preload the sound
        const audio = new Audio(
          "sound-effect/cinematic-intro-3-40041 (mp3cut.net).mp3"
        );
        audio.preload = "auto";
        const letters = document.querySelectorAll(".letter");
        const preloader = document.getElementById("preloader");
        const main = document.getElementById("main");

        // Attempt to play the audio automatically
        const playAudio = () => {
          audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
          });
        };

        // Play audio if allowed
        playAudio();

        // GSAP timeline animation
        const timeline = gsap.timeline({
          defaults: { duration: 1.2, ease: "power4.out" },
        });

        // Stage 1: Powerful 3D entry with scaling and rotation
        timeline
          .fromTo(
            letters,
            {
              opacity: 0,
              scale: 0,
              rotationX: 360,
              rotationY: 360,
              translateZ: 1000,
              filter: "blur(20px)",
            },
            {
              opacity: 1,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              translateZ: 0,
              filter: "blur(0px)",
              stagger: {
                each: 0.05,
                from: "center",
              },
              ease: "elastic.out(1, 0.75)",
            }
          )
          .to(letters, {
            scale: 1.5,
            duration: 0.8,
            rotationX: 180,
            rotationY: 180,
            translateZ: 1500,
            ease: "power3.inOut",
            stagger: {
              each: 0.05,
              from: "random",
            },
          })
          .to(letters, {
            scale: 0.5,
            duration: 1,
            rotationX: -360,
            rotationY: 720,
            translateZ: -2000,
            opacity: 0.5,
            ease: "power4.inOut",
            stagger: {
              each: 0.05,
              from: "end",
            },
          })
          .to(letters, {
            opacity: 0,
            scale: 0.2,
            rotationX: 720,
            rotationY: 720,
            translateZ: -3000,
            ease: "power4.in",
            filter: "blur(50px)",
            stagger: {
              each: 0.05,
              from: "start",
            },
            duration: 1.2,
          })
          .to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              preloader.style.display = "none";
              main.style.display = "block";
            },
          });
      }
    });
  }

  preLoader();

  function allGsapCode() {
    function page1Anim() {
      // Register GSAP
      gsap.registerPlugin();

      // Main Timeline
      const mainTimeline = gsap.timeline({
        defaults: { ease: "power4.out", duration: 2.5 },
        repeat: 0,
      });

      // Step 1: Wall Image - Full 3D Entrance with Perspective
      mainTimeline
        .fromTo(
          ".wall-image img",
          { scale: 3, rotateX: 90, opacity: 0, transformPerspective: 1500 },
          {
            scale: 1,
            rotateX: 0,
            opacity: 1,
            duration: 3,
            ease: "power4.out",
            transformPerspective: 1500,
            transformOrigin: "center center",
          }
        )
        .fromTo(
          ".wall-image img",
          { filter: "blur(30px)" },
          { filter: "blur(0px)", duration: 2, ease: "power4.out" },
          "-=2"
        );

      // Step 2: Typography-1 - 3D Flip and Expand
      mainTimeline.fromTo(
        ".typography-1",
        {
          y: 200,
          opacity: 0,
          scale: 0.4,
          rotateX: 90,
          transformPerspective: 1200,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 2.5,
          ease: "back.out(2)",
          transformPerspective: 1200,
          transformOrigin: "center center",
          onComplete: () =>
            gsap.to(".typography-1", {
              rotateX: 10,
              duration: 1.5,
              yoyo: true,
              repeat: 1,
              ease: "power1.inOut",
            }),
        },
        "-=2"
      );

      // Step 3: Typography-2 - Complex 3D Rotation and Scaling
      mainTimeline.fromTo(
        ".typography-2",
        {
          scale: 0.3,
          opacity: 0,
          rotateY: 180,
          rotateX: 180,
          transformPerspective: 1500,
        },
        {
          scale: 0.9,
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 3,
          ease: "elastic.out(1, 0.6)",
          transformPerspective: 1500,
          transformOrigin: "center center",
          onComplete: () =>
            gsap.to(".typography-2", {
              scale: 1,
              rotateY: 10,
              duration: 1.5,
              // yoyo: true,
              // repeat: 1,
              ease: "power1.inOut",
            }),
        },
        "-=2"
      );
      mainTimeline.fromTo(
        ".description",
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      );
      // Step 4: Gradient - 3D Perspective Shift and Fade
      mainTimeline.fromTo(
        ".gradient",
        { opacity: 0.8, scale: 1.2, rotateX: 20, transformPerspective: 1000 },
        {
          opacity: 0.6,
          scale: 1,
          rotateX: 0,
          duration: 2.5,
          ease: "power4.out",
          transformPerspective: 1000,
          transformOrigin: "center center",
          onComplete: () =>
            gsap.to(".gradient", {
              // rotateX: -10,
              duration: 1.5,
              // repeat: 1,
              ease: "power1.inOut",
            }),
        },
        "-=2"
      );

      // Enhanced Animation for .g-pt
      gsap.fromTo(
        ".g-pt",
        {
          scale: 1,
          // rotateX: 360,
          // rotateY: 360,
          opacity: 0,
          y: 400,
          transformPerspective: 1500,
        },
        {
          scale: 0.9,
          // rotateX: 0,
          // rotateY: 0,
          opacity: 1,
          y: 30,
          duration: 3,
          ease: "power4.out",
          transformPerspective: 1500,
          transformOrigin: "center center",
          onComplete: () =>
            gsap.to(".g-pt", {
              scale: 1,
              y: 0,
              // rotateY: 10,
              duration: 1.5,
              // repeat: -1,
              ease: "power2.inOut",
            }),
        }
      );

      let anim = gsap.timeline({
        scrollTrigger: {
          trigger: ".description",
          start: "top 85%",
          end: "top 50%",
          scrub: 0.4,
        },
      });
      gsap.set(".description h1 div", {
        y: 100,
        opacity: 0,
      });
      anim.to(".description h1 div", {
        y: 0,
        duration: 1,
        opacity: 1,
        stagger: 0.1,
      });
    }

    page1Anim();
    function page1A() {
      gsap.registerPlugin(ScrollTrigger);

      // Main timeline for animations
      const page1Atl = gsap.timeline({
        scrollTrigger: {
          trigger: ".kpt-one",
          start: "top 80%", // Adjust start point for smooth triggering
          end: "bottom top", // Adjust end point for the desired scroll effect
          scrub: true,
          markers: false, // Remove markers in production
        },
      });

      // Animation for .kpt-one
      page1Atl.fromTo(
        ".kpt-one",
        {
          scale: 0.5,
          rotateY: 90,
          opacity: 0,
          transformPerspective: 1200,
          y: 50,
        },
        {
          scale: 1,
          rotateY: 0,
          opacity: 1,
          transformPerspective: 1200,
          y: 0,
          duration: 2,
          ease: "power3.out",
          transformOrigin: "center center",
        }
      );
      // Animation for .kpt-two
      page1Atl.fromTo(
        ".kpt-two",
        {
          scale: 0.5,
          rotateY: -90,
          opacity: 0,
          transformPerspective: 1200,
          y: -50,
        },
        {
          scale: 1,
          rotateY: 0,
          opacity: 1,
          transformPerspective: 1200,
          y: 0,
          duration: 2,
          ease: "power3.out",
          transformOrigin: "center center",
          stagger: 0.5, // Staggered effect for more dynamic entrance
        },
        "-=1" // Overlap with previous animation
      );
    }

    page1A();
    // function animateTextWithPin() {
    //   gsap.registerPlugin(ScrollTrigger);

    //   // Create a timeline for the animation
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: "#page2",
    //       start: "top top",
    //       end: "bottom top",
    //       scrub: true,
    //       pin: true,
    //       markers: false, // Remove markers for production
    //     },
    //   });

    //   // Initial animation: text enters with 3D effects
    //   tl.fromTo(
    //     ".word",
    //     {
    //       opacity: 0,
    //       y: 150,
    //       scale: 0.5,
    //       rotateX: 90,
    //       rotateY: 90,
    //       transformPerspective: 1500,
    //       zIndex: 1,
    //     },
    //     {
    //       opacity: 1,
    //       y: 0,
    //       scale: 1,
    //       rotateX: 0,
    //       rotateY: 0,
    //       transformPerspective: 1500,
    //       stagger: {
    //         amount: 1,
    //         from: "random",
    //         ease: "power4.out",
    //       },
    //       duration: 2,
    //     }
    //   )

    //     // Transform Phase: Rotate and scale up for a dynamic effect
    //     .to(
    //       ".word",
    //       {
    //         scale: 1.2,
    //         rotateX: 360,
    //         rotateY: 360,
    //         ease: "power2.inOut",
    //         duration: 2,
    //         stagger: {
    //           amount: 0.5,
    //           from: "start",
    //         },
    //       },
    //       "-=1.5"
    //     )

    //     // Return to Default Position: Scale down and opacity adjustment
    //     .to(
    //       ".word",
    //       {
    //         scale: 1,
    //         rotationX: 0,
    //         rotationY: 0,
    //         y: 0,
    //         opacity: 1,
    //         ease: "power2.out",
    //         duration: 2,
    //         stagger: {
    //           amount: 0.5,
    //           from: "start",
    //         },
    //       },
    //       "-=1.5"
    //     );
    // }
    // animateTextWithPin();
    function advanced4DAnimation() {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#page2",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          markers: false, // Remove markers in production
        },
      });

      // Initial Phase: Words Entrance with Dynamic 3D Transformations
      tl.fromTo(
        ".word",
        {
          opacity: 0,
          scale: 0.2,
          y: 100,
          z: -500,
          rotateX: 90,
          rotateY: 90,
          transformPerspective: 2000,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 3,
          ease: "power4.out",
          transformOrigin: "center center",
          stagger: {
            amount: 1,
            from: "center",
          },
        }
      )

        // Intermediate Phase: Advanced 4D Rotation and Movement
        .to(
          ".word",
          {
            rotateX: 180,
            rotateY: 360,
            scale: 1.2,
            y: -50,
            z: 200,
            duration: 4,
            ease: "elastic.out(1, 0.3)",
            transformOrigin: "center center",
            stagger: {
              amount: 0.5,
              from: "start",
            },
          },
          "-=2"
        )

        // Dynamic Phase: Complex Rotation and Translation
        .to(
          ".word",
          {
            rotateX: -360,
            rotateY: 720,
            scale: 1.3,
            y: -100,
            z: -300,
            duration: 4,
            ease: "back.out(1.7)",
            transformOrigin: "center center",
            stagger: {
              amount: 0.5,
              from: "start",
            },
          },
          "-=3"
        )

        // Final Phase: Returning to Initial Position with Enhanced Effects
        .to(
          ".word",
          {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            y: 0,
            z: 0,
            opacity: 1,
            duration: 3,
            ease: "power4.out",
            transformOrigin: "center center",
            stagger: {
              amount: 1,
              from: "center",
            },
          },
          "-=2"
        );
    }

    // Call the function to start the animation
    advanced4DAnimation();

    function thirdPageAnim() {
      let thirdPageTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: "#page3",
          start: "top 0%",
          end: "top -200%",
          pin: true,
          scrub: 1,
        },
      });
      thirdPageTrigger.to(
        ".third-page-img-box",
        {
          delay: 1.2,
          x: -1060,
          duration: 4,
        },
        "same"
      );
      thirdPageTrigger.to(
        "#main",
        {
          backgroundColor: "#00000",
          duration: 4,
        },
        "same"
      );
    }
    // thirdPageAnim();
    function fifthAnim() {
      let page_4_all = document.querySelectorAll(".page-1");
      page_4_all.forEach((pages) => {
        let text_part = pages.querySelector(".text-part");
        let card_img = pages.querySelector(".card");
        gsap.set(text_part, {
          xPercent: -200,
          opacity: 0,
        });
        gsap.set(card_img, {
          xPercent: 100,
          opacity: 0,
        });
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: pages,
            start: "top bottom",
            end: "bottom 90%",
            scrub: 0.2,
          },
        });
        tl.to(
          text_part,
          {
            xPercent: 0,
            opacity: 1,
          },
          "<"
        );
        tl.to(
          card_img,
          {
            xPercent: 0,
            opacity: 1,
          },
          "<"
        );
      });
    }
    fifthAnim();
    function sixAnim() {
      const imgSect = document.querySelector(".part-2 img");
      const textOne = document.querySelector(".rest-one");
      const textTwo = document.querySelector(".rest-two");
      let allPt = document.querySelector(".part-3 .pt");

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
        rotate: 10, // Initial subtle rotation for uniqueness
        skewX: 10, // Initial skew to create a dynamic effect
        transformOrigin: "center center",
      });

      let hh = gsap.timeline({
        scrollTrigger: {
          trigger: "#page6",
          start: "top center",
          end: "40% top",
          scrub: 1,
          markers: false,
          once: true,
        },
      });

      // Image animation
      hh.to(imgSect, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      })
        .to(imgSect, {
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

      // Unique textOne animation
      hh.to(textOne, {
        opacity: 1,
        y: 0,
        scale: 1, // Return to normal scale
        rotate: 0, // Smoothly rotate back to normal
        skewX: 0, // Skew back to neutral
        duration: 1.4,
        ease: "elastic.out(1, 0.6)", // Use elastic easing for a bounce-like effect
      }).to(
        textOne,
        {
          duration: 0.3,
          ease: "back.in(1.2)",
        },
        "-=0.3"
      );

      // Unique textTwo animation
      hh.to(textTwo, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        skewX: 0,
        duration: 2.8, // Slower for more emphasis
        ease: "power2.out",
      })
        .to(
          textTwo,
          {
            scale: 1.1, // Slightly overshoot for a bounce effect
            duration: 0.3,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        )
        .to(
          textTwo,
          {
            scale: 1,
            duration: 0.3,
            ease: "back.in(1.2)",
          },
          "-=0.3"
        );
    }

    sixAnim();
    function boxes() {
      // Animate mail text with fade-in and upward movement
      gsap.fromTo(
        ".whole-page .part-3",
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
            trigger: ".whole-page .part-3",
            start: "top 90%",
            end: "top 50%",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      );

      // Animate method-box with advanced 3D effects
      gsap.utils.toArray(".part-3 .pt").forEach((item, index) => {
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
    boxes();
    function page7Anim() {
      let page7Trigger = gsap.timeline({
        scrollTrigger: {
          trigger: "#page7",
          start: "top top",
          end: "bottom top",
          pin: true,
          markers: false,
          scrub: 1,
        },
      });
      page7Trigger.to(
        ".page-7-video",
        {
          height: "100%",
          width: "100%",
          duratoin: 1,
          scale: 1,
        },
        "anim"
      );
      page7Trigger.to(
        ".rural",
        {
          fontSize: "15vw",
          duratoin: 1,
          left: "20vw",
        },
        "anim"
      );
      page7Trigger.to(
        ".peace",
        {
          fontSize: "15vw",
          duratoin: 1,
          right: "20vw",
        },
        "anim"
      );
      page7Trigger.to(".rural", {
        delay: 0.1,
      });
    }
    page7Anim();
  }
  allGsapCode();
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

//google authentication
window.onload = function () {
  fetch("/api/user")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn) {
        const user = data.user;
        // console.log(user._json.picture);
        // Display profile picture
        const profilePic = document.createElement("img");
        console.log(user);
        // profilePic.src = user._json.picture;
        profilePic.src = "images/commentor.jpg";
        // profilePic.alt = "Profile Picture";
        profilePic.style.borderRadius = "50%"; // Make it round
        document
          .getElementById("profile-pic-container")
          .appendChild(profilePic);
        console.log(profilePic);
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
