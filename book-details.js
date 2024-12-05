// Example book data
const books = [
  {
    id: 1,
    title: "The Experience",
    author: "Shadik Hossain",
    description: `Life experience is just as important, if not more, than formal education. It gives you confidence in tough situations and helps you stay calm even after setbacks, like losing a job. While school confines you within four walls, traveling and real-life experiences teach you independence, problem-solving, and resilience. A person with a college degree may lack the practical wisdom of someone like a farmer, who, through hard work and life challenges, develops the strength to handle adversity. I recently explored Dhaka City, one of the busiest places in the world, and through my journey, I gained valuable experiences. These experiences inspired me to write a book, The Experience, where I share some of my most memorable and life-changing moments. In this book, you'll learn the real importance of experience and how it shapes your ability to tackle life's challenges.
`,
    price: 0.0,
    cover: "images/The Experience.jpg",
    pdf:
      "https://drive.google.com/file/d/1HD9B5s8y5M6h4Mub5lJWkOOw39e66ImG/view?usp=sharing",
  },
  {
    id: 2,
    title: "The Incidents I Faced",
    author: "Shadik Hossain",
    description: `'The Incidents I Faced' takes you on a heartfelt journey through the ups and downs of a young person's life. From the stress of exams and the chaos of the pandemic to the pain of first love and rejection, this book is about the moments that shape us.

The author shares personal stories with honesty and humor, showing how a failed attempt to impress a girl leads to the creation of a YouTube channel, *Creative C99*. Along the way, you'll discover the lessons learned from heartbreak, friendship, and finding new ways to express yourself.

This book is a relatable story of growing up, overcoming challenges, and turning setbacks into something creative. 'The Incidents I Faced' will make you laugh, reflect, and remind you of the strength we all have to move forward, no matter the obstacles.`,
    price: "0.0",
    cover: "images/Some Incidents I Face.jpg",
    pdf:
      "https://drive.google.com/file/d/1esJJqyLAyZI7afHGsdhPU25j7xG9UkTr/view?usp=sharing",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // Get book ID from URL
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get("id"));

  // Find the selected book
  const selectedBook = books.find((book) => book.id === bookId);

  // Populate book details
  if (selectedBook) {
    document.getElementById("book-cover").src = selectedBook.cover;
    document.getElementById("book-title").textContent = selectedBook.title;
    document.getElementById(
      "book-author"
    ).textContent = `by ${selectedBook.author}`;
    document.getElementById("book-description").textContent =
      selectedBook.description;
    document.getElementById("book-price").textContent = `$${parseFloat(
      selectedBook.price
    ).toFixed(2)}`;

    // Attach dynamic PDF link
    const readNowButton = document.querySelector(".btn-secondary");
    readNowButton.addEventListener("click", () => {
      window.open(selectedBook.pdf, "_blank"); // Open the book's PDF
    });
  } else {
    console.error("Book not found");
  }
});
