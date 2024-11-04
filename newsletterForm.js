// Initialize Froala Editor
const editor = new FroalaEditor("#editor-container", {
  placeholderText: "Write your newsletter content here...",
  toolbarButtons: [
    // Editing
    "undo",
    "redo",
    "clearFormatting",
    "selectAll",
    // Text Formatting
    "bold",
    "italic",
    "underline",
    "strike",
    "fontSize",
    "textColor",
    "backgroundColor",
    "fontFamily",
    "inlineStyle",
    "paragraphStyle",
    "lineHeight",
    "superscript",
    "subscript",
    // Alignment and Indentation
    "align",
    "paragraphFormat",
    "indent",
    "outdent",
    // Lists
    "formatOL",
    "formatUL",
    // Insert Elements
    "insertHR",
    "insertLink",
    "insertImage",
    "insertVideo",
    "insertTable",
    "insertFile",
    "insertSpecialCharacters",
    "insertEmoji",
    "insertPageBreak",
    "quote",
    "insertMargin",
    // Code and HTML
    "html",
    "markdown",
    "codeBeautifier",
    "embedly",
    // Special Features
    "fullscreen",
    "emoticons",
    "print",
    "entities",
    "draggable",
    "fontAwesome",
    // Help and Support
    "help",
  ],
  events: {
    "image.beforeUpload": function (files) {
      const formData = new FormData();
      formData.append("file", files[0]); // Append the file

      // Send the file to the server
      fetch("/upload-endpoint", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            // Insert the uploaded image into the editor
            this.image.insert(data.url, true);
          } else {
            console.error("Image upload failed:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });

      // Prevent Froala from uploading the image itself
      return false;
    },
  },
});
// Load draft from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTitle = localStorage.getItem("newsletterTitle");
  const savedContent = localStorage.getItem("newsletterContent");

  if (savedTitle) {
    document.getElementById("title").value = savedTitle;
  }
  if (savedContent) {
    editor.html.set(savedContent);
  }
});

// Save draft to localStorage
function saveDraft() {
  const title = document.getElementById("title").value;
  const content = editor.html.get();

  localStorage.setItem("newsletterTitle", title);
  localStorage.setItem("newsletterContent", content);
}

// Periodically save draft every few seconds
setInterval(saveDraft, 5000); // Save every 5 seconds
// Submit newsletter form
document
  .getElementById("newsletterForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const title = document.getElementById("title").value;
    const content = editor.html.get();

    const thumbnailInput = document.getElementById("thumbnail");
    const thumbnailFile = thumbnailInput.files[0];

    let thumbnailUrl = "";
    try {
      thumbnailUrl = await uploadThumbnail(thumbnailFile);
    } catch (error) {
      alert("Error uploading thumbnail.");
      return;
    }

    // Prepare newsletter data
    const newsletterData = {
      title,
      content,
      thumbnail: thumbnailUrl,
    };

    // Send data to server
    try {
      const response = await fetch("/create-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsletterData),
      });

      if (!response.ok) {
        throw new Error("Failed to create newsletter");
      }

      alert("Newsletter created successfully!");
      // Optionally, reset the form
      document.getElementById("newsletterForm").reset();
      editor.html.set(""); // Clear the editor
    } catch (error) {
      console.error("Error creating newsletter:", error);
      alert("Error creating newsletter.");
    }
  });

// Upload thumbnail
async function uploadThumbnail(file) {
  if (!file) return ""; // No file selected

  const formData = new FormData();
  formData.append("thumbnail", file);

  const response = await fetch("/upload-thumbnail-endpoint", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload thumbnail");
  }

  const data = await response.json();
  return data.url; // Assuming your server returns the URL of the uploaded thumbnail
}
