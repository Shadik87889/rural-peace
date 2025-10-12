// Fetch newsletters from localStorage or initialize an empty array
let newsletters = JSON.parse(localStorage.getItem("newsletters")) || [];
let find = document.querySelector(".find");
find.addEventListener("click", () => {
  document.querySelector("#searchInput").focus();
});
// Fetch selected newsletter from localStorage
const selectedNewsletter = JSON.parse(
  localStorage.getItem("selectedNewsletter")
);

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

// Function to render the selected newsletter content
const renderNewsletterDetails = (newsletter) => {
  const newsletterContentDiv = document.getElementById("newsletterContent");
  newsletterContentDiv.innerHTML = ""; // Clear existing content

  if (!newsletter) {
    newsletterContentDiv.innerHTML = "<p>No newsletter found.</p>";
    return;
  }

  const mainContentDiv = createElement("div", ["main-content"]);
  const title = createElement("h1", ["blog-title"], newsletter.title);
  const content = createElement("div", ["blog-content"], newsletter.content);
  const image = createElement("img", ["theme-img"]);
  image.src = newsletter.thumbnail;
  image.alt = newsletter.title;
  image.style.width = "100%";

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
  const subBtn = createElement("button", ["subscribe"], "SUBSCRIBE");
  const subA = createElement("a", [], "");
  subA.href = "Newsletter-subscription";
  subA.appendChild(subBtn);

  mainContentDiv.append(image, writerLabel, date, title, content);

  // Common relevant content (sidebar)
  const sidebarDiv = createElement("div", ["sidebar"]);
  const commonContent = createElement(
    "div",
    ["common-content"],
    `
    <h2>Recent Articles</h2>
    <ul id="recentArticlesList"></ul>
    <h2>Popular Topics</h2>
    <ul id="popularTopicsList"></ul>
    <h2>Search</h2>
    <input type="text" id="searchInput" placeholder="Search articles..." />
    <button id="searchButton">Search</button>
    <p class="to-sub-rec">For more insights, check out our latest articles!</p>
  `
  );

  sidebarDiv.append(commonContent, subA);
  newsletterContentDiv.append(mainContentDiv, sidebarDiv);

  renderRecentArticles();
  renderPopularTopics();
};

// Function to render all matched newsletters
const renderMatchedNewsletters = (matchedNewsletters) => {
  const newsletterContentDiv = document.getElementById("newsletterContent");
  const mainContentDiv = newsletterContentDiv.querySelector(".main-content");

  // Clear the main content area
  if (mainContentDiv) {
    mainContentDiv.innerHTML = "";
  }

  const matchedListDiv = createElement("div", ["matched-newsletters"]);

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

  // Append the matched newsletters to the main content area
  if (mainContentDiv) {
    mainContentDiv.appendChild(matchedListDiv);
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
const viewNewsletter = (id) => {
  const selectedNewsletter = newsletters.find(
    (newsletter) => newsletter.id === id
  );
  localStorage.setItem(
    "selectedNewsletter",
    JSON.stringify(selectedNewsletter)
  );
  // Navigate to the newsletter detail page
  window.location.href = `Newsletter-details?id=${id}`; // Adjust as necessary
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

    if (filteredNewsletters.length > 0) {
      // Store matched newsletters in localStorage
      localStorage.setItem(
        "matchedNewsletters",
        JSON.stringify(filteredNewsletters)
      );
      // Navigate to the matched newsletters page
      localStorage.removeItem("noNewsletterMessage");
      // Navigate to the matched newsletters page
      window.location.href = "matched-newsletters.html";
    } else {
      // Store message in localStorage
      localStorage.setItem("noNewsletterMessage", "No newsletter found");
      // Navigate to the matched newsletters page
      window.location.href = "matched-newsletters.html";
    }
  });
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderNewsletterDetails(selectedNewsletter);
  initSearch();
});
