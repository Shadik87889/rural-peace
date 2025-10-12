document.getElementById("postButton").addEventListener("click", function () {
  const content = document.getElementById("postContent").value;
  const imageFile = document.getElementById("postImage").files[0];
  const postsContainer = document.getElementById("postsContainer");

  if (!content && !imageFile) {
    alert("Please write something or upload an image.");
    return;
  }

  const postElement = document.createElement("div");
  postElement.className = "post";

  // Post header (user info placeholder)
  const header = document.createElement("div");
  header.className = "post-header";
  const userAvatar = document.createElement("img");
  userAvatar.src = "images/profile.png"; // Placeholder avatar
  userAvatar.style.height = "40px";
  userAvatar.style.width = "40px";
  userAvatar.style.borderRadius = "50%";
  const userName = document.createElement("h4");
  userName.textContent = "Shadik Hossain"; // Placeholder user name
  header.appendChild(userAvatar);
  header.appendChild(userName);
  postElement.appendChild(header);

  // Post content (if exists)
  if (content) {
    const textElement = document.createElement("p");
    textElement.className = "post-content";
    textElement.textContent = content;
    postElement.appendChild(textElement);
  }

  // Reactions (pre-create to ensure it’s always appended correctly)
  const reactionsDiv = document.createElement("div");
  reactionsDiv.className = "reactions";
  ["👍 Like"].forEach((reaction) => {
    const button = document.createElement("button");
    button.textContent = reaction;
    reactionsDiv.appendChild(button);
  });

  // Comments (pre-create to ensure it’s always appended correctly)
  const commentsDiv = document.createElement("div");
  commentsDiv.className = "comments";
  const commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.placeholder = "Write a comment...";
  commentInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && commentInput.value) {
      const comment = document.createElement("p");
      comment.textContent = commentInput.value;
      commentsDiv.insertBefore(comment, commentInput);
      commentInput.value = "";
    }
  });
  // commentsDiv.appendChild(commentInput);

  // Post image (if exists)
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgElement = document.createElement("img");
      imgElement.src = e.target.result;
      imgElement.style.marginTop = "15px"; // Space between text and image
      imgElement.style.width = "100%";
      imgElement.style.borderRadius = "12px";
      postElement.appendChild(imgElement);

      // Append reactions and comments AFTER image
      postElement.appendChild(reactionsDiv);
      postElement.appendChild(commentsDiv);
    };
    reader.readAsDataURL(imageFile);
  } else {
    // If no image, append reactions and comments immediately
    postElement.appendChild(reactionsDiv);
    postElement.appendChild(commentsDiv);
  }

  // Append post to container
  postsContainer.prepend(postElement);

  // Reset composer
  document.getElementById("postContent").value = "";
  document.getElementById("postImage").value = "";
});
