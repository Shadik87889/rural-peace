const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname); // Save files in the same directory as post.js
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid duplicates
  },
});
const upload = multer({ storage });

// Route for uploading blog post
app.post("/post.upload-blog", upload.single("image"), (req, res) => {
  const blogPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: `/${req.file.filename}`, // Use the filename directly
    date: new Date(),
    clicks: 0,
  };

  // Save to JSON file
  fs.readFile("submissions.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading submissions file");
    }
    const blogs = JSON.parse(data);
    blogs.push(blogPost);
    fs.writeFile("submissions.json", JSON.stringify(blogs), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving submissions file");
      }
      res.redirect("/post.index.html"); // Redirect to main page after uploading
    });
  });
});

// Route to serve the main blog page
app.get("/post.index.html", (req, res) => {
  fs.readFile("submissions.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading submissions file");
    }
    const blogs = JSON.parse(data);
    res.send(`
      <html>
        <head>
          <title>My Blog</title>
        </head>
        <body>
          <h1>My Blog</h1>
          <div id="blog-list">
            ${blogs
              .map(
                (blog, index) => `
              <div class="blog-post-thumbnail" onclick="toggleContent(${index})">
                <h2>${blog.title}</h2>
                <img src="${blog.imageUrl}" alt="Blog Image" width="200">
                <p>Date: ${new Date(blog.date).toLocaleDateString()}</p>
                <p>Clicks: ${blog.clicks}</p>
                <div id="content-${index}" class="blog-content" style="display:none;">
                  <p>${blog.content}</p>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
          <a href="/post.upload.html">Create a New Blog Post</a>

          <script>
            function toggleContent(index) {
              const contentDiv = document.getElementById('content-' + index);
              if (contentDiv.style.display === 'none') {
                contentDiv.style.display = 'block';
                fetch('/post.increment-clicks', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ index })
                }).then(response => response.json())
                  .then(data => {
                    const clicksElement = document.querySelector(\`#content-\${index}\`).previousElementSibling.querySelector('p:last-child');
                    clicksElement.textContent = \`Clicks: \${data.clicks}\`;
                  });
              } else {
                contentDiv.style.display = 'none';
              }
            }
          </script>
        </body>
      </html>
    `);
  });
});

// Route for the upload form
app.get("/post.upload.html", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Upload Blog Post</title>
      </head>
      <body>
        <h1>Upload Blog Post</h1>
        <form action="/post.upload-blog" method="POST" enctype="multipart/form-data">
          <label for="title">Title:</label>
          <input type="text" name="title" required><br>
          
          <label for="content">Content:</label>
          <textarea name="content" required></textarea><br>
          
          <label for="image">Image:</label>
          <input type="file" name="image" accept="image/*" required><br>
          
          <button type="submit">Upload</button>
        </form>
        <a href="/post.index.html">Back to Blog</a>
      </body>
    </html>
  `);
});

// Increment clicks
app.post("/post.increment-clicks", (req, res) => {
  fs.readFile("submissions.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading submissions file");
    }
    const blogs = JSON.parse(data);
    const index = req.body.index;
    blogs[index].clicks += 1;
    fs.writeFile("submissions.json", JSON.stringify(blogs), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving submissions file");
      }
      res.json({ clicks: blogs[index].clicks });
    });
  });
});

// Initialize empty submissions.json if it doesn't exist
if (!fs.existsSync("submissions.json")) {
  fs.writeFileSync("submissions.json", JSON.stringify([]));
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
