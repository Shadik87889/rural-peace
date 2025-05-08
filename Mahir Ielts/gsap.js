gsap.registerPlugin(ScrollTrigger);

// Animate the "Ready, set, Go" text
gsap.from("#page2 .flex-el h1", {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#page2 .flex-el",
    start: "top 80%",
    end: "top 40%",
    scrub: true,
    once: true,
  },
});

// Animate each featured card as they come into view
gsap.from("#page2 .featured-card-wrapper", {
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#page2 .all-featured-cards",
    start: "top 85%",
    end: "top 40%",
    scrub: true,
    once: true,
  },
});
