// Fetch newsletters from localStorage or initialize an empty array
let newsletters = JSON.parse(localStorage.getItem("newsletters")) || [];
let find = document.querySelector(".find");
find.addEventListener("click", () => {
  document.querySelector("#searchInput").focus();
});
// Fetch matched newsletters from localStorage
let matchedNewsletters =
  JSON.parse(localStorage.getItem("matchedNewsletters")) || [];

// Function to format date and time
const formatDateTime = (postTime) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(postTime);
  const formattedDate = date.toLocaleDateString("en-US", options);
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
  return `${formattedDate} at ${formattedTime}`;
};

// Function to create an element with optional classes and content
const createElement = (tag, classes = [], content = "") => {
  const element = document.createElement(tag);
  if (classes.length) element.classList.add(...classes);
  if (content) element.innerHTML = content;
  return element;
};

// Function to render matched newsletters
const renderMatchedNewsletters = () => {
  const matchedListDiv = document.getElementById("matchedNewslettersContent");

  if (matchedNewsletters.length === 0) {
    matchedListDiv.innerHTML = "<p>No newsletters found.</p>";
    return;
  }

  matchedNewsletters.forEach((newsletter) => {
    const newsletterItem = createElement("div", ["newsletter-item"]);
    const image = createElement("img", ["thumbnail-img"]);
    image.src = newsletter.thumbnail;
    image.alt = newsletter.title;

    const title = createElement("h3", ["newsletter-title"], newsletter.title);
    const writerLabel = createElement(
      "div",
      ["writer-name"],
      "By Shadik Hossain"
    );
    const date = createElement(
      "div",
      ["post-date"],
      formatDateTime(newsletter.postTime)
    );
    const clicks = createElement(
      "div",
      ["clicks-count"],
      `${newsletter.clicks} clicks`
    );

    // Add click event to view the newsletter
    title.onclick = () => viewNewsletter(newsletter.id);

    newsletterItem.append(image, title, writerLabel, date, clicks);

    matchedListDiv.appendChild(newsletterItem);
  });
  const message = localStorage.getItem("noNewsletterMessage");
  if (message) {
    matchedListDiv.innerText = message;
    matchedListDiv.style.height = "100px";
    matchedListDiv.style.width = "100%";
    matchedListDiv.style.fontSize = "15px";
    matchedListDiv.style.display = "flex";
    matchedListDiv.style.alignItems = "center";
    matchedListDiv.style.justifyContent = "center";

    localStorage.removeItem("noNewsletterMessage");
  }
};

// Function to render recent articles
const renderRecentArticles = () => {
  const recentArticlesList = document.getElementById("recentArticlesList");
  recentArticlesList.innerHTML = ""; // Clear existing list
  const recentArticles = newsletters
    .sort((a, b) => new Date(b.postTime) - new Date(a.postTime))
    .slice(0, 3); // Get the top 3 recent articles

  recentArticles.forEach((article) => {
    const listItem = createElement(
      "li",
      [],
      `<a href="#" onclick="viewNewsletter('${article.id}')">${article.title}</a>`
    );
    recentArticlesList.appendChild(listItem);
  });
};

// Function to render popular topics
const renderPopularTopics = () => {
  const popularTopicsList = document.getElementById("popularTopicsList");
  popularTopicsList.innerHTML = ""; // Clear existing list
  const popularTopics = newsletters
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 3); // Get the top 3 most clicked newsletters

  popularTopics.forEach((topic) => {
    const listItem = createElement(
      "li",
      [],
      `<a href="#" onclick="viewNewsletter('${topic.id}')">${topic.title}</a>`
    );
    popularTopicsList.appendChild(listItem);
  });
};

// Function to view a newsletter
// Function to view a newsletter
const viewNewsletter = (id) => {
  // Search in the entire newsletters array
  const selectedNewsletter = newsletters.find(
    (newsletter) => newsletter.id === id
  );

  if (selectedNewsletter) {
    localStorage.setItem(
      "selectedNewsletter",
      JSON.stringify(selectedNewsletter)
    );
    // Fix the URL format (add an equals sign)
    window.location.href = `Newsletter-details?id=${id}`;
  } else {
    console.error("Newsletter not found");
  }
};

// Search functionality
const initSearch = () => {
  document.getElementById("searchButton").addEventListener("click", () => {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const filteredNewsletters = newsletters.filter((newsletter) =>
      newsletter.title.toLowerCase().includes(searchTerm)
    );

    const matchedListDiv = document.getElementById("matchedNewslettersContent");
    matchedListDiv.innerHTML = ""; // Clear previous results
    if (filteredNewsletters.length > 0) {
      filteredNewsletters.forEach((newsletter) => {
        const newsletterItem = createElement("div", ["newsletter-item"]);
        const image = createElement("img", ["thumbnail-img"]);
        image.src = newsletter.thumbnail;
        image.alt = newsletter.title;

        const title = createElement(
          "h3",
          ["newsletter-title"],
          newsletter.title
        );
        const writerLabel = createElement(
          "div",
          ["writer-name"],
          "By Shadik Hossain"
        );
        const date = createElement(
          "div",
          ["post-date"],
          formatDateTime(newsletter.postTime)
        );
        const clicks = createElement(
          "div",
          ["clicks-count"],
          `${newsletter.clicks} clicks`
        );

        // Add click event to view the newsletter
        title.onclick = () => viewNewsletter(newsletter.id);

        newsletterItem.append(image, title, writerLabel, date, clicks);

        matchedListDiv.appendChild(newsletterItem);
      });
    } else {
      matchedListDiv.innerHTML = "<p>No newsletters found.</p>";
      matchedListDiv.style.height = "100px";
      matchedListDiv.style.width = "100%";
      matchedListDiv.style.fontSize = "15px";
      matchedListDiv.style.display = "flex";
      matchedListDiv.style.alignItems = "center";
      matchedListDiv.style.justifyContent = "center";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderMatchedNewsletters();
  renderRecentArticles();
  renderPopularTopics();
  initSearch();
});

//nav-anim
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

        let pageOne = document.querySelector("body");
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
