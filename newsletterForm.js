// Initialize Froala Editor
const editor = new FroalaEditor("#editor-container", {
  placeholderText: "Write your newsletter content here...",
  toolbarButtons: [
    "undo",
    "redo",
    "clearFormatting",
    "selectAll",
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
    "align",
    "paragraphFormat",
    "indent",
    "outdent",
    "formatOL",
    "formatUL",
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
    "html",
    "markdown",
    "codeBeautifier",
    "embedly",
    "fullscreen",
    "print",
    "entities",
    "fontAwesome",
    "help",
  ],
  events: {
    "image.beforeUpload": async function (files) {
      if (files.length) {
        const formData = new FormData();
        formData.append("file", files[0]);

        try {
          const response = await fetch("/upload-endpoint", {
            method: "POST",
            body: formData,
          });

          // Check if the response is JSON
          const text = await response.text();
          let data;
          try {
            data = JSON.parse(text);
          } catch (error) {
            console.error("Failed to parse JSON:", text);
            throw new Error("Invalid JSON response from server");
          }

          if (data.url) {
            this.image.insert(data.url, true);
          } else {
            console.error(
              "Image upload failed:",
              data.error || "Unknown error"
            );
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }

        return false;
      }
    },
  },
});

// Submit newsletter form
document
  .getElementById("newsletterForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = editor.html.get();

    const thumbnailInput = document.getElementById("thumbnail");
    const thumbnailFile = thumbnailInput.files[0];

    let thumbnailUrl = "";
    if (thumbnailFile) {
      try {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      } catch (error) {
        alert("Error uploading thumbnail.");
        console.error("Thumbnail upload error:", error);
        return;
      }
    }

    const newsletterData = {
      title,
      content,
      thumbnail: thumbnailUrl,
    };

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
      document.getElementById("newsletterForm").reset();
      editor.html.set("");
    } catch (error) {
      console.error("Error creating newsletter:", error);
      alert("Error creating newsletter.");
    }
  });

// Upload thumbnail with error handling for JSON response
async function uploadThumbnail(file) {
  const formData = new FormData();
  formData.append("thumbnail", file);

  const response = await fetch("/upload-thumbnail-endpoint", {
    method: "POST",
    body: formData,
  });

  // Check if response is JSON
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse JSON:", text);
    throw new Error("Invalid JSON response from server");
  }

  if (!data.url) {
    throw new Error("Thumbnail upload failed, URL not returned");
  }

  return data.url;
}
