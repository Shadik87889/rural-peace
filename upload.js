document
  .getElementById("blog-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const blogPost = { title, content };

    try {
      const response = await fetch("/submit-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogPost),
      });
      if (response.status === 204) {
        console.log("Blog post submitted successfully!");
        document.getElementById("blog-form").reset(); // Clear the form after submission
        loadBlogs(); // Refresh the blog list
      } else {
        console.error("Error submitting blog post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

async function loadBlogs() {
  try {
    const response = await fetch("/blogs.json");
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const blogs = await response.json();

    const blogsContainer = document.getElementById("blogs");
    blogsContainer.innerHTML = ""; // Clear current blogs

    blogs.reverse().forEach((blog) => {
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog-post");

      const blogTitle = document.createElement("h3");
      blogTitle.textContent = blog.title;

      const blogContent = document.createElement("p");
      blogContent.textContent = blog.content;

      blogElement.appendChild(blogTitle);
      blogElement.appendChild(blogContent);
      blogsContainer.appendChild(blogElement);
    });
  } catch (error) {
    console.error("Error loading blogs:", error);
  }
}

// Load blogs when the page loads
loadBlogs();
