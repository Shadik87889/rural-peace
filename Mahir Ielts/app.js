function newsTicker() {
  document.addEventListener("DOMContentLoaded", function () {
    const movingWrapper = document.querySelector(".moving-wrapper");
    const movingText = document.querySelector(".moving-one");
    movingWrapper.appendChild(movingText.cloneNode(true));

    let position = 0; // Start from center
    const speed = 1.5; // Adjust for smoothness

    function animateText() {
      position -= speed;
      if (position <= -movingText.offsetWidth) {
        position = 0; // Reset position smoothly when fully scrolled
      }
      movingWrapper.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animateText);
    }

    animateText();
  });
}

newsTicker();
