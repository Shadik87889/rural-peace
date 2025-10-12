gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Smooth Header Animation with Cinematic Depth and Particle Effect
  gsap.timeline().from(".header-overlay", {
    opacity: 0,
    y: -300,
    rotateX: -90, // Deep 3D rotation
    skewX: 30,
    scale: 0.8,
    filter: "blur(15px)", // Strong blur at start
    duration: 2.5,
    ease: "power4.out",
  });

  // Add particles falling effect (hypothetical particle divs in HTML)
  gsap.to(".particle", {
    y: "100vh",
    opacity: 0,
    duration: 10,
    stagger: {
      amount: 5,
      from: "random",
    },
    repeat: -1,
    ease: "none",
  });

  // Projects Animation with Multi-Layer Parallax
  gsap.utils.toArray(".project").forEach((project, index) => {
    const delay = index * 0.4;

    gsap.fromTo(
      project,
      {
        opacity: 0,
        x: index % 2 === 0 ? -250 : 250,
        y: 150,
        rotateY: index % 2 === 0 ? -60 : 60, // Stronger 3D rotations
        scale: 0.85,
        filter: "brightness(0.5) blur(8px)",
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotateY: 0,
        scale: 1,
        filter: "brightness(1) blur(0px)",
        duration: 1.2,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: project,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none none", // No replay
          once: true, // Ensure it plays only once
        },
        delay,
      }
    );

    // Add glowing borders dynamically when project comes into view
    gsap.to(project, {
      boxShadow: "0px 10px 40px rgba(255, 255, 255, 0.5)",
      scrollTrigger: {
        trigger: project,
        start: "top 90%",
        toggleActions: "play none none none", // No replay
        once: true, // Play only once
      },
    });
  });

  // Images Zoom with Dynamic Depth Transition
  gsap.utils.toArray(".project-image img").forEach((img) => {
    gsap.fromTo(
      img,
      {
        scale: 1.6,
        rotateZ: 20,
        rotateX: -20,
        filter: "brightness(0.7) blur(10px)",
      },
      {
        scale: 1,
        rotateZ: 0,
        rotateX: 0,
        filter: "brightness(1) blur(0px)",
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: img,
          start: "top 95%",
          end: "top 50%",
          scrub: true,
          once: true, // Ensure it plays only once
        },
      }
    );
  });

  // Statistics Counter with Explosive Scale and Lighting Effect
  gsap.utils.toArray(".counter").forEach((counter) => {
    gsap.fromTo(
      counter,
      {
        textContent: 0,
        scale: 0.8,
        color: "rgb(200, 200, 255)",
      },
      {
        textContent: counter.getAttribute("data-target"),
        scale: 1,
        color: "white",
        duration: 2.5,
        snap: { textContent: 1 },
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none none", // No replay
          once: true, // Ensure it plays only once
        },
      }
    );
  });

  // Testimonials Animation with Floating Effect
  gsap.utils.toArray(".testimonial").forEach((testimonial, index) => {
    const delay = index * 0.3;

    gsap.fromTo(
      testimonial,
      {
        opacity: 0,
        y: 200,
        rotateX: 60,
        scale: 0.9,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "elastic.out(1.2, 0.5)",
        scrollTrigger: {
          trigger: testimonial,
          start: "top 90%",
          toggleActions: "play none none none", // No replay
          once: true, // Ensure it plays only once
        },
        delay,
      }
    );
  });

  // Call-to-Action Button with Dynamic Ripple Effect
  const ctaButton = document.querySelector(".donate-button");
  gsap.to(ctaButton, {
    scale: 1.1,
    boxShadow: "0px 0px 30px rgba(255, 0, 0, 0.8)",
    duration: 1.5,
    ease: "sine.inOut",
  });

  // Footer Icons with Smooth Glow on Hover
  gsap.utils.toArray(".social-icons a").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        scale: 1.3,
        boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.6)",
        duration: 0.3,
        ease: "back.out(1.5)",
      });
    });
    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power3.out",
      });
    });
  });
});
