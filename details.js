let storedComments = [];
let hasReacted = false; // Initialize hasReacted state
let reactCount = 0; // Initialize global react count
const reactBtn = document.querySelector(".react-btn");
const reactCountDisplay = document.querySelector(".react-count");
const postId = selectedNewsletter.id; // Assuming this is the ID of the post

// Function to update UI based on the reaction state
function updateUI() {
  reactCountDisplay.textContent = `❤️ ${reactCount}`;
  if (hasReacted) {
    reactBtn.innerHTML = '<span><i class="fa-solid fa-heart"></i></span>React';
    reactBtn.style.color = "red";
  } else {
    reactBtn.innerHTML =
      '<span><i class="fa-regular fa-heart"></i></span>React';
    reactBtn.style.color = "";
  }
}

// Function to update global react count
async function updateGlobalReactCount() {
  let loggedInEmails = await fetch("/api/loggedInEmails").then((res) =>
    res.json()
  );
  let newReactCount = 0;

  // Count reactions from all users
  for (const email of loggedInEmails) {
    const userReacted = await fetch(
      `/api/reacted?postId=${postId}&email=${email}`
    ).then((res) => res.json());
    if (userReacted) {
      newReactCount += 1;
    }
  }

  reactCount = newReactCount;
  await fetch(`/api/updateGlobalReactCount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, reactCount }),
  });
}

// Fetch user data
fetch("/api/user")
  .then((response) => response.json())
  .then(async (data) => {
    // Retrieve global react count from the server (shared count)
    reactCount = await fetch(
      `/api/globalReactCount?postId=${postId}`
    ).then((res) => res.json());

    if (data.loggedIn) {
      const user = data.user;
      const userEmail = user._json.email;

      // Retrieve the user's reaction state from the server
      hasReacted =
        (await fetch(
          `/api/reacted?postId=${postId}&email=${userEmail}`
        ).then((res) => res.json())) || false;

      // Update the UI for the initial load
      updateUI();

      // Retrieve existing emails from the server
      let loggedInEmails = await fetch("/api/loggedInEmails").then((res) =>
        res.json()
      );

      // Add the new email if it's not already in the array
      if (!loggedInEmails.includes(userEmail)) {
        loggedInEmails.push(userEmail);
        await fetch("/api/addLoggedInEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        });
      }

      // Add click event listener to the react button
      reactBtn.addEventListener("click", async () => {
        hasReacted = !hasReacted;

        // Update server with the new reaction state
        await fetch(`/api/react`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, email: userEmail, hasReacted }),
        });

        // Update global react count based on all users' reactions
        await updateGlobalReactCount();

        // Update UI to reflect the new react count and user state
        updateUI();
      });
    } else {
      // If no user is logged in, just show the react count
      reactCountDisplay.textContent = `❤️ ${reactCount}`;
      reactBtn.disabled = true;
      reactBtn.style.color = "#505050";
      reactBtn.style.textDecoration = "line-through";
    }

    // Fetch comments and replies after user data is fetched
    fetchCommentsAndReplies();
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
  });

// Comment functionality
const commentInput = document.querySelector(".comment-input");
const submitCommentBtn = document.querySelector(".submit-comment");
const commentsDiv = document.querySelector(".comments");
const noCommentsMessage = document.createElement("div");
noCommentsMessage.textContent = "No comments yet.";
noCommentsMessage.classList.add("no-comments-message");
commentsDiv.appendChild(noCommentsMessage);

// Comment button state management
function commentBtnDisabled() {
  submitCommentBtn.disabled = true;

  const checkInputValue = () => {
    submitCommentBtn.disabled = commentInput.value.trim() === "";
  };

  commentInput.addEventListener("input", checkInputValue);
  commentInput.addEventListener("keydown", checkInputValue);

  // Add enter key functionality to submit comment
  commentInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !submitCommentBtn.disabled) {
      submitCommentBtn.click();
      event.preventDefault(); // Prevent newline
    }
  });
}

commentBtnDisabled();

// Fetch comments and replies on page load
async function fetchCommentsAndReplies() {
  try {
    const fetchedComments =
      (await fetch(`/api/comments?postId=${postId}`).then((res) =>
        res.json()
      )) || [];

    // for (const comment of storedComments) {
    //   await renderComment(comment);
    // }

    // updateCommentCount(storedComments);
    storedComments = fetchedComments;

    // Initial render of comments
    renderComments();

    updateCommentCount(fetchedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

// Update comment count based on comments and replies
async function updateCommentCount(comments) {
  const cmntCountDisplay = document.querySelector(".cmnt-count");
  let totalComments = comments.length;

  for (const comment of comments) {
    try {
      const storedReplies =
        (await fetch(
          `/api/replies?postId=${postId}&commentId=${comment.id}`
        ).then((res) => res.json())) || [];
      totalComments += storedReplies.length;
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  }

  cmntCountDisplay.innerHTML = `<i class="fa-solid fa-comment"></i> ${totalComments}`;
  noCommentsMessage.style.display = totalComments === 0 ? "block" : "none";
}

// Show profile picture
let addCmntPP = document.querySelector(".add-comment .profile-pic");
addCmntPP.src = "images/commentor.jpg";

function showPP() {
  fetch("/api/user")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedIn) {
        const user = data.user;
        // addCmntPP.src = user._json.picture;
        addCmntPP.src = "images/commentor.jpg";
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
}
showPP();

// Comment rendering function
async function renderComment(comment) {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  const commentId = comment.id;
  const commentTimeAgo = getTimeAgo(comment.timePosted);
  commentDiv.innerHTML = `
    <div class='commentor-pp-name'>
        <img src="${comment.userPic}" alt="Profile Pic" class="profile-pic" />
        <div class='name-comment'>
            <div class="commentor-name">${comment.userName}</div>
            <div class="comment-text">${comment.text}</div>
        </div>
    </div>
    <div class="comment-details">
        <div class="comment-actions">
        <p class='cmnt-time'>${commentTimeAgo}</p>
            <button class="reply-btn" aria-label="Reply to this comment">Reply</button>
        </div>
        <span class="reply-count" style="margin-left: 10px;"></span>
        <div class="replies-container" style="display: none;"></div>
    </div>
  `;

  const repliesContainer = commentDiv.querySelector(".replies-container");
  const replyCountDisplay = commentDiv.querySelector(".reply-count");

  const showReplies = async () => {
    repliesContainer.style.display = "block";
    replyCountDisplay.style.display = "none";

    if (!commentDiv.querySelector(".reply-container")) {
      const replyContainer = document.createElement("div");
      replyContainer.classList.add("add-comment", "reply-container");

      const replyImg = document.createElement("img");
      replyImg.src = comment.userPic;
      replyImg.alt = "Profile Pic";
      replyImg.classList.add("profile-pic");

      const replyInput = document.createElement("input");
      replyInput.type = "text";
      replyInput.classList.add("reply-input");
      replyInput.placeholder = "Write a reply...";
      replyInput.setAttribute("aria-label", "Reply input");

      const replySubmit = document.createElement("button");
      replySubmit.textContent = "Reply";
      replySubmit.classList.add("reply-submit");

      replySubmit.addEventListener("click", async () => {
        const replyText = replyInput.value.trim();
        if (replyText) {
          const data = await fetch("/api/user").then((res) => res.json());
          if (data.loggedIn) {
            const user = data.user;
            const replyId = Date.now(); // Unique ID
            const reply = {
              id: replyId,
              text: replyText,
              userName: user.displayName,
              // userPic: user._json.picture,
              userPic: "images/commentor.jpg",
              timePosted: new Date().toISOString(),
            };
            await fetch(`/api/replies`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ postId, commentId, reply }),
            });

            const replyDiv = createReplyElement(reply, commentId);
            repliesContainer.insertBefore(replyDiv, replyContainer);
            updateCommentCount();

            replyInput.value = ""; // Clear the input
          } else {
            window.location.href = "/auth/google";
          }
        }
      });

      replyInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && replyInput.value.trim()) {
          replySubmit.click();
          event.preventDefault(); // Prevent newline
        }
      });

      replyContainer.append(replyImg, replyInput, replySubmit);
      repliesContainer.append(replyContainer);
    }
    document.querySelector(".reply-input").focus();
  };

  const storedReplies =
    (await fetch(
      `/api/replies?postId=${postId}&commentId=${commentId}`
    ).then((res) => res.json())) || [];
  replyCountDisplay.textContent =
    storedReplies.length > 0
      ? `${storedReplies.length} ${
          storedReplies.length === 1 ? "reply" : "replies"
        }`
      : ""; // Update: Do not show '0 replies'

  commentDiv.querySelector(".reply-btn").addEventListener("click", showReplies);
  replyCountDisplay.addEventListener("click", showReplies);
  storedReplies.forEach((reply) => {
    const replyDiv = createReplyElement(reply, commentId);
    repliesContainer.appendChild(replyDiv);
  });

  commentsDiv.appendChild(commentDiv);
}

// Create reply element
function createReplyElement(reply, commentId) {
  const replyDiv = document.createElement("div");
  replyDiv.classList.add("comment", "reply");
  const replyTimeAgo = getTimeAgo(reply.timePosted);
  replyDiv.innerHTML = `
    <div class='replyer-pp-name'>
        <img src="${reply.userPic}" alt="Profile Pic" class="profile-pic" />
        <div class='name-comment'>
            <div class="commentor-name reply-section-name">${reply.userName}</div>
            <div class="comment-text">${reply.text}</div>
        </div>
    </div>
    <div class="comment-details">
        <div class="comment-actions reply-actions">
        <p class='cmnt-time'>${replyTimeAgo}</p>
            <button class="reply-btn reply-section-btn" aria-label="Reply to this reply">Reply</button>
        </div>
    </div>
  `;
  const replyBtn = replyDiv.querySelector(".reply-section-btn");
  const replySectionName = replyDiv.querySelector(".reply-section-name")
    .textContent;

  replyBtn.addEventListener("click", () => {
    // Find the corresponding reply input field
    const replyInput = document.querySelector(".reply-input");

    // Insert the name of the reply-section-name into the input
    replyInput.value = `@${replySectionName} `;

    // Focus on the input field so the user can start typing the reply
    replyInput.focus();
  });
  return replyDiv;
  //it's okay darling
}

// Load more comments functionality
const renderLimit = 5;
let currentCommentsCount = 0;
const initialRenderLimit = 5; // Set initial limit to 5

async function renderComments() {
  const commentsToRender = storedComments.slice(
    currentCommentsCount,
    currentCommentsCount + renderLimit
  );

  commentsToRender.forEach((comment) => renderComment(comment)); // Call your existing renderComment function

  currentCommentsCount += commentsToRender.length;

  // Show or hide the "Load More" button based on the remaining comments
  loadMoreBtn.style.display =
    currentCommentsCount < storedComments.length ? "block" : "none";
}

// Create "Load More Comments" button
const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "More Comments...";
loadMoreBtn.classList.add("load-more-comments");
loadMoreBtn.style.display = "none";
document.querySelector(".loading-comment").appendChild(loadMoreBtn);

loadMoreBtn.addEventListener("click", renderComments);

// Initial render of comments (display 5 comments first)
const initialCommentsToRender = storedComments.slice(
  Math.max(storedComments.length - initialRenderLimit, 0)
);
initialCommentsToRender.forEach((comment) => renderComment(comment));
currentCommentsCount += initialCommentsToRender.length;

loadMoreBtn.style.display =
  currentCommentsCount < storedComments.length ? "block" : "none";

// Comment submission
submitCommentBtn.addEventListener("click", async () => {
  const commentText = commentInput.value?.trim(); // Optional chaining
  if (commentText) {
    const data = await fetch("/api/user").then((res) => res.json());
    if (data.loggedIn) {
      const user = data.user;
      const commentId = Date.now(); // Unique ID
      const newComment = {
        id: commentId,
        text: commentText,
        userName: user.displayName,
        // userPic: user._json.picture,
        userPic: "images/commentor.jpg",
        timePosted: new Date().toISOString(),
      };
      await fetch(`/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, comment: newComment }),
      });

      renderComment(newComment);
      commentInput.value = "";
      updateCommentCount();
      noCommentsMessage.textContent = "";
    } else {
      window.location.href = "/auth/google";
    }
  }
});

// Update the comment count on page load
updateCommentCount([]); // Pass an empty array initially

// Focus on and scroll to the comment input when the "Comment" button is clicked
const commentBoxClick = document.querySelector(".comment-box-click button");
commentBoxClick.addEventListener("click", () => {
  commentInput.focus();
  commentInput.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Social media hover effect
function socialMediaHoverEffect() {
  let hover__box = document.querySelectorAll(".hover-box");
  let hover__on = document.querySelectorAll(".social-media a");

  hover__on.forEach((hover, index) => {
    let box = hover__box[index]; // Match each hover_on with its corresponding hover_box
    hover.addEventListener("mouseenter", () => {
      box.classList.add("hover-done");
    });
    hover.addEventListener("mouseleave", () => {
      box.classList.remove("hover-done");
    });
  });
}
socialMediaHoverEffect();

// Time ago function
function getTimeAgo(postTime) {
  const now = new Date();
  const timePosted = new Date(postTime); // Convert to date object

  if (isNaN(timePosted.getTime())) {
    return "Invalid date";
  }

  // Calculate difference in seconds
  const seconds = Math.floor((now - timePosted) / 1000);

  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
  if (seconds < 2419200) return `${Math.floor(seconds / 604800)}w`; // weeks
  if (seconds < 29030400) return `${Math.floor(seconds / 2419200)}mo`; // months
  return `${Math.floor(seconds / 29030400)}y`; // years
}
