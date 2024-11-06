// Global variable to store newsletters
let newsletters = [];

// Fetch newsletters from the server or localStorage
async function fetchNewsletters() {
  try {
    const response = await fetch("https://ruralpeace.org/newsletters");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    newsletters = await response.json(); // Store fetched newsletters

    // Update localStorage
    const newslettersString = JSON.stringify(newsletters);
    if (newslettersString.length < 5242880) {
      localStorage.setItem("newsletters", newslettersString);
    } else {
      console.warn("Newsletters data exceeds localStorage limit.");
    }

    // Fetch logged-in user information
    const userResponse = await fetch("/api/user");
    const userData = await userResponse.json();
    const userEmail = userData?.user?._json?.email;

    renderNewsletters(newsletters, userEmail); // Render the newsletters
  } catch (error) {
    console.error("Error fetching newsletters or user data:", error);
  }
}

// Render newsletters to the DOM
function renderNewsletters(newsletters, userEmail) {
  const newsletterList = document.getElementById("newsletterList");
  newsletterList.innerHTML = ""; // Clear existing items

  // Sort newsletters by post time in descending order
  newsletters.sort((a, b) => new Date(b.postTime) - new Date(a.postTime));

  if (newsletters.length === 0) {
    newsletterList.innerHTML =
      "<p class='no-blog'>No Blogs available (ಥ﹏ಥ)</p>";
    return; // Exit the function early
  }

  // Set up pagination
  const renderLimit = 10; // Number of newsletters to show initially
  let currentNewsletterCount = 0;

  function renderNextBatch() {
    const newslettersToRender = newsletters.slice(
      currentNewsletterCount,
      currentNewsletterCount + renderLimit
    );

    newslettersToRender.forEach((newsletter) => {
      const newsletterItem = document.createElement("div");
      newsletterItem.classList.add("blog");

      const blogImg = document.createElement("div");
      blogImg.classList.add("blog-img");
      const thumbnail = document.createElement("img");
      thumbnail.src = newsletter.thumbnail;
      thumbnail.alt = newsletter.title;
      thumbnail.style.cursor = "pointer";

      // Click event to show content and update clicks
      thumbnail.addEventListener("click", async () => {
        console.log("Selected newsletter:", newsletter);
        await updateClicks(newsletter.id);
        localStorage.setItem("selectedNewsletter", JSON.stringify(newsletter));
        window.location.href = `Newsletter-details?id=${newsletter.id}`; // Ensure this path is correct
      });

      blogImg.appendChild(thumbnail);

      const blogTitle = document.createElement("div");
      blogTitle.classList.add("blog-title");
      blogTitle.textContent = newsletter.title;

      const bloggerInfo = document.createElement("div");
      bloggerInfo.classList.add("blogger-name-img");
      const profileImg = document.createElement("img");
      profileImg.src = "images/profile.png"; // Same profile pic for all
      profileImg.width = 200;

      const bloggerName = document.createElement("div");
      bloggerName.classList.add("blogger-name");
      bloggerName.textContent = "Shadik Hossain"; // Same name for all

      bloggerInfo.appendChild(profileImg);
      bloggerInfo.appendChild(bloggerName);

      const postDate = document.createElement("div");
      postDate.classList.add("post-date");
      const currentTimeAgo = getTimeAgo(newsletter.postTime);
      postDate.innerHTML = `<div class="date">${currentTimeAgo}</div>`;

      const clicksDisplay = document.createElement("div");
      clicksDisplay.classList.add("clicks");
      clicksDisplay.textContent = `${newsletter.clicks} clicks`;

      // Create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-button");

      // Show delete button only for specific users
      if (
        userEmail === "mdshadikhossain830@gmail.com" ||
        userEmail === "org.ruralpeace@gmail.com"
      ) {
        deleteBtn.style.display = "block";
      } else {
        deleteBtn.style.display = "none";
      }

      // Event listener for delete button
      deleteBtn.addEventListener("click", async () => {
        const confirmed = confirm(
          "Are you sure you want to delete this newsletter?"
        );
        if (confirmed) {
          await deleteNewsletter(newsletter.id); // Call the delete function
          fetchNewsletters(); // Refresh the newsletter list after deletion
        }
      });

      newsletterItem.appendChild(blogImg);
      newsletterItem.appendChild(blogTitle);
      newsletterItem.appendChild(bloggerInfo);
      newsletterItem.appendChild(postDate);
      newsletterItem.appendChild(clicksDisplay);
      newsletterItem.appendChild(deleteBtn); // Add the delete button to the newsletter item

      newsletterList.appendChild(newsletterItem);
    });

    currentNewsletterCount += newslettersToRender.length;
    loadMoreBtn.style.display =
      currentNewsletterCount < newsletters.length ? "block" : "none";
  }

  // Create "Load More Newsletters" button
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.textContent = "Load More...";
  loadMoreBtn.classList.add("load-more-newsletters");
  loadMoreBtn.style.display = "none";
  document.getElementById("loadMoreButton").appendChild(loadMoreBtn);

  loadMoreBtn.addEventListener("click", renderNextBatch);

  // Initial render of newsletters
  renderNextBatch();
}

// Fetch the selected newsletter from localStorage
const selectedNewsletter = JSON.parse(
  localStorage.getItem("selectedNewsletter")
);

// Render the details for the selected newsletter if available
if (selectedNewsletter) {
  renderNewsletterDetails(selectedNewsletter);
}

// Function to get time ago
function getTimeAgo(postTime) {
  const now = new Date();
  const timePosted = new Date(postTime);

  if (isNaN(timePosted.getTime())) {
    console.error("Invalid post time:", postTime);
    return "Invalid date";
  }

  const seconds = Math.floor((now - timePosted) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} d ago`;

  return timePosted.toLocaleDateString();
}

// Fetch newsletters and render them when the DOM is ready
document.addEventListener("DOMContentLoaded", fetchNewsletters);

// Function to render the selected newsletter content
function renderNewsletterDetails(newsletter) {
  const newsletterContentDiv = document.getElementById("newsletterContent");

  if (!newsletterContentDiv) {
    console.error("newsletterContentDiv is not found in the DOM");
    return; // Exit if the element is not found
  }

  const title = document.createElement("h1");
  title.textContent = newsletter.title;

  const content = document.createElement("div");
  content.innerHTML = newsletter.content; // Ensure this is sanitized if using user-generated content

  const clicksDisplay = document.createElement("p");
  clicksDisplay.textContent = `Clicks: ${newsletter.clicks}`;

  newsletterContentDiv.appendChild(title);
  newsletterContentDiv.appendChild(content);
  newsletterContentDiv.appendChild(clicksDisplay);
}

// Function to delete a newsletter
async function deleteNewsletter(id) {
  try {
    console.log(`Deleting newsletter with ID: ${id}`);
    const response = await fetch(`https://ruralpeace.org/newsletters/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete newsletter: ${response.statusText}`);
    }

    const data = await response.json(); // Get response data
    console.log("Server response:", data);

    // Remove the deleted newsletter from the local newsletters list
    newsletters = newsletters.filter((newsletter) => newsletter.id !== id);

    // Update localStorage after deletion
    localStorage.setItem("newsletters", JSON.stringify(newsletters));

    // Re-render the updated list of newsletters
    renderNewsletters(newsletters); // Call the function to re-render the list
  } catch (error) {
    console.error("Error deleting newsletter:", error);
  }
}

// Function to update clicks on the server and localStorage
async function updateClicks(id) {
  const newsletters = JSON.parse(localStorage.getItem("newsletters")) || [];
  const clickedNewsletter = newsletters.find((news) => news.id === id);

  if (clickedNewsletter) {
    clickedNewsletter.clicks += 1; // Increment clicks
    const currentClicks = clickedNewsletter.clicks;

    // Update clicks in the server
    await updateClicksInDB(id, currentClicks);

    // Update clicks in localStorage
    updateLocalStorage(id, currentClicks);
  }
}

// Function to update clicks in the database
async function updateClicksInDB(id, clicks) {
  try {
    const response = await fetch(`https://ruralpeace.org/newsletters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clicks }),
    });
    if (!response.ok) {
      throw new Error("Failed to update clicks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating clicks:", error);
  }
}

// Function to update localStorage with clicks
function updateLocalStorage(id, clicks) {
  const newsletters = JSON.parse(localStorage.getItem("newsletters")) || [];
  const updatedNewsletters = newsletters.map((news) =>
    news.id === id ? { ...news, clicks } : news
  );
  localStorage.setItem("newsletters", JSON.stringify(updatedNewsletters));
}
