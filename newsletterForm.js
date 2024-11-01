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
  imageUploadURL: "/upload-endpoint", // Your upload endpoint
  imageUploadMethod: "POST",
  events: {
    "image.uploaded": function (response) {
      let jsonResponse;

      try {
        jsonResponse =
          typeof response === "string" ? JSON.parse(response) : response;
      } catch (error) {
        console.error("Error parsing response:", error);
        return; // Exit if parsing fails
      }

      // Ensure response has the expected format
      if (jsonResponse && jsonResponse.url) {
        this.image.insert(jsonResponse.url);
      } else {
        console.error("Invalid upload response:", jsonResponse);
        alert("Error uploading image: No link in upload response");
      }
    },
    "image.error": function (error) {
      console.error("Image upload error:", error);
      alert(
        "Error uploading image: " +
          (error && error.message ? error.message : "An unknown error occurred")
      );
    },
  },
});
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
