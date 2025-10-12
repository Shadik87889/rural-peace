function copyToClipboard(text, button) {
  // Check if clipboard API is supported
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      function () {
        button.innerText = "Copied";
      },
      function (err) {
        console.error("Could not copy text: ", err);
        fallbackCopyTextToClipboard(text, button);
      }
    );
  } else {
    // Use the fallback method if clipboard API is not supported
    fallbackCopyTextToClipboard(text, button);
  }
}

// Fallback method for copying text to clipboard
function fallbackCopyTextToClipboard(text, button) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  tempTextArea.style.position = "fixed"; // Ensure it's not visible
  document.body.appendChild(tempTextArea);
  tempTextArea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      button.innerText = "Copied";
    } else {
      console.error("Fallback: Copying text command was unsuccessful.");
    }
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(tempTextArea); // Remove the temporary textarea
}

// Event listeners for each button
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const numberType = this.getAttribute("data-number");
    let numberToCopy;

    if (numberType === "bkash") {
      numberToCopy = "01966785176";
    } else if (numberType === "nagad") {
      numberToCopy = "01966785176";
    } else if (numberType === "rocket") {
      numberToCopy = "01750087889";
    }

    copyToClipboard(numberToCopy, this);
  });
});

// Automatically show the popup when the webpage loads
$(document).ready(function () {
  $(".custom-model-main").addClass("model-open");
});

// Close the popup when clicking on the close button or the background overlay
$(".close-btn, .bg-overlay").click(function () {
  $(".custom-model-main").removeClass("model-open");
});
