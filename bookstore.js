// Example book data
const books = [
  {
    id: 1,
    title: "The Experience",
    author: "Shadik Hossain",
    cover: "images/The Experience.jpg",
  },
  {
    id: 2,
    title: "The Incidents I Faced",
    author: "Shadik Hossain",
    cover: "images/Some Incidents I Face.jpg",
  },
];

const bookGrid = document.getElementById("bookGrid");

// Render books dynamically
books.forEach((book) => {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <div class="book-info">
          <h3>${book.title}</h3>
          <p>by ${book.author}</p>
      </div>
    `;
  card.addEventListener("click", () => {
    window.location.href = `book-details.html?id=${book.id}`;
  });
  bookGrid.appendChild(card);
});
