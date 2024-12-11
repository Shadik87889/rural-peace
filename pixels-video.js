//
const videoElement = document.getElementById("nature-video");

// Replace with your actual Pexels API key
const apiKey = process.env.PEXELS_API_KEY;

// Function to fetch a new video from Pexels
async function fetchNewVideo() {
  try {
    const response = await fetch(
      `https://api.pexels.com/videos/search?query=nature&per_page=1`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    const data = await response.json();
    console.log("API Response:", data); // Log the API response

    if (data.videos && data.videos.length > 0) {
      const videoUrl = data.videos[0].video_files[0].link;
      console.log("Video URL:", videoUrl); // Log the video URL

      videoElement.src = videoUrl; // Update the video source
    } else {
      console.error("No videos found.");
    }
  } catch (error) {
    console.error("Error fetching video:", error);
  }
}

// Function to check if 24 hours have passed
function checkIfDayPassed() {
  const lastUpdated = localStorage.getItem("lastUpdated");
  const currentTime = new Date().getTime();

  if (!lastUpdated || currentTime - lastUpdated >= 86400000) {
    // 86400000 ms = 24 hours
    fetchNewVideo(); // Fetch a new video
    localStorage.setItem("lastUpdated", currentTime); // Save the current time
  }
}

// Initial check on page load
checkIfDayPassed();

// Optionally, check periodically (e.g., every 5 minutes) if the day has passed
setInterval(checkIfDayPassed, 300000); // 300000 ms = 5 minutes
