//rural-peace-org
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const app = express();

// const upload = multer({ storage });
const PORT = process.env.PORT || 3003; // or another port
// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Redirect to home
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Define page routes
const pages = [
  "Home",
  "about",
  "contact",
  "Programs",
  "NewsletterForm",
  "Donate",
  "Blood-donation",
  "Social-issues",
  "Help-people",
  "Sound-environment",
  "Update-donor-account",
  "Delete-donor-account",
  "Newsletter-subscription",
  "Newsletter-unsubscription",
  "Blood-donor-list",
  "Blood-donor-profile",
  "Newsletter-details",
  "Be-a-blood-donor",
];

pages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, `${page}.html`));
  });
});
const GIST_ID = process.env.GIST_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
let subscribers = [];
let newsletters = [];
let users = [];
let posts = {}; // postId -> { globalReactCount, reactions, comments }
let loggedInEmails = [];
let donors = [];
// let sessions = [];
let submissions = [];
async function loadNewslettersFromGist() {
  try {
    const response = await axios.get(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const files = response.data.files;
    if (files["newsletterData.json"]) {
      newsletters = JSON.parse(files["newsletterData.json"].content);
    }
  } catch (error) {
    console.error("Error loading newsletters from Gist:", error);
  }
}

// Function to save newsletters to the Gist
async function saveDataToGist() {
  const gistData = {
    description: "Newsletter Data",
    public: false, // Set to false for a secret Gist
    files: {
      "newsletterData.json": {
        content: JSON.stringify(newsletters, null, 2),
      },
    },
  };

  try {
    await axios.patch(`https://api.github.com/gists/${GIST_ID}`, gistData, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
  } catch (error) {
    console.error("Error saving to Gist:", error);
  }
}
// Function to load posts data from the Gist
async function loadPostsFromGist() {
  try {
    const response = await axios.get(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const files = response.data.files;
    if (files["posts.json"]) {
      const content = files["posts.json"].content;
      posts = content ? JSON.parse(content) : {}; // Use {} if content is empty or undefined
      // Ensure it's an object
      if (typeof posts !== "object" || Array.isArray(posts)) {
        posts = {};
      }
    }
  } catch (error) {
    console.error("Error loading posts from Gist:", error);
    posts = {}; // Default to empty object on error
  }
}

// Function to save posts data to the Gist
async function savePostsToGist() {
  // Validate posts structure
  if (typeof posts !== "object" || Array.isArray(posts)) {
    console.error("Posts data is not an object. Resetting to empty object.");
    posts = {};
  }

  const gistData = {
    description: "Posts Data",
    public: false, // Set to false for a secret Gist
    files: {
      "posts.json": {
        content: JSON.stringify(posts, null, 2),
      },
    },
  };

  try {
    await axios.patch(`https://api.github.com/gists/${GIST_ID}`, gistData, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
  } catch (error) {
    console.error("Error saving posts to Gist:", error);
  }
}

// Function to load donor data from the Gist
async function loadDonorsFromGist() {
  try {
    const response = await axios.get(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const files = response.data.files;
    if (files["donors.json"]) {
      donors = JSON.parse(files["donors.json"].content);
    }
  } catch (error) {
    console.error("Error loading donors from Gist:", error);
  }
}

// Function to save donor data to the Gist
async function saveDonorsToGist() {
  const gistData = {
    description: "Donor Data",
    public: false, // Set to false for a secret Gist
    files: {
      "donors.json": {
        content: JSON.stringify(donors, null, 2),
      },
    },
  };

  try {
    await axios.patch(`https://api.github.com/gists/${GIST_ID}`, gistData, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
  } catch (error) {
    console.error("Error saving donors to Gist:", error);
  }
}
// Function to load subscribers from the Gist
async function loadSubscribersFromGist() {
  try {
    const response = await axios.get(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const files = response.data.files;
    if (files["subscribers.json"]) {
      subscribers = JSON.parse(files["subscribers.json"].content);
    }
  } catch (error) {
    console.error("Error loading subscribers from Gist:", error);
  }
}

// Function to save subscribers to the Gist
async function saveSubscribersToGist() {
  const gistData = {
    description: "Subscriber Data",
    public: false, // Set to false for a secret Gist
    files: {
      "subscribers.json": {
        content: JSON.stringify(subscribers, null, 2),
      },
    },
  };

  try {
    await axios.patch(`https://api.github.com/gists/${GIST_ID}`, gistData, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
  } catch (error) {
    console.error("Error saving subscribers to Gist:", error);
  }
}

// loadSessionsFromGist();
loadSubscribersFromGist();
loadDonorsFromGist();
loadNewslettersFromGist();
loadPostsFromGist();

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret-here",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Use your actual email password
  },
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, email, phone, address, text } = req.body;
  const submissionTime = new Date().toDateString(); // Get the current date
  const submission = { name, email, phone, address, text, submissionTime };

  submissions.push(submission);

  const submissionList = submissions
    .map(
      (sub, index) => `
      Submission ${index + 1}:
        Name: ${sub.name}
        Email: ${sub.email}
        Phone: ${sub.phone}
        Address: ${sub.address}
        Message: ${sub.text}
        Submitted On: ${sub.submissionTime}
    `
    )
    .join("\n\n");

  const newSubmissionMailOptions = {
    from: email,
    to: process.env.GMAIL_USER, // Your email
    subject: `New message from ${name}`,
    text: `New submission received:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nMessage: ${text}\nSubmitted On: ${submissionTime}`,
  };

  const allSubmissionsMailOptions = {
    from: "no-reply@yourdomain.com",
    to: "org.ruralpeace@gmail.com", // Change to your valid email
    subject: `Updated List of All Submissions`,
    text: `Current submissions:\n${submissionList}`,
  };

  transporter.sendMail(newSubmissionMailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send(error.toString());
    }

    transporter.sendMail(allSubmissionsMailOptions, (error) => {
      if (error) {
        console.error("Error sending all submissions email:", error);
        return res.status(500).send(error.toString());
      }
      res.status(200).send("Message sent successfully!");
    });
  });
});

// Google OAuth setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Use your actual secret
      callbackURL: "https://www.ruralpeace.org/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google authentication routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/newsletters.html");
  }
);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid");
    res.redirect("/home");
  });
});

// API route to fetch logged-in user's data
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      loggedIn: true,
      user: req.user,
    });
  } else {
    res.json({
      loggedIn: false,
      user: null,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Load stored data from file (if it exists)

const dataFilePath = path.join(__dirname, "data.json");

if (fs.existsSync(dataFilePath)) {
  const rawData = fs.readFileSync(dataFilePath);
  const parsedData = JSON.parse(rawData);
  subscribers = parsedData.subscribers || [];
  newsletters = parsedData.newsletters || [];
}

// Function to send notification email to all subscribers
const notifySubscribers = (newsletter) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "mdshadikhossain830@gmail.com",
    bcc: subscribers.join(","),
    subject: "New Newsletter Published: " + newsletter.title,

    html: `
      <div style="padding: 20px; font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 700px;
      margin: 0 auto; background-color: #f9f9f9; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
  
        <!-- Header with Logo -->
        <div style="text-align: center; padding: 40px; background-color: #ffffff; border-radius: 12px 12px 0 0; border-bottom: 1px solid #e0e0e0;">
          <img src="https://i.imgur.com/pp6RPBO.jpeg" alt="Company Logo" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #4CAF50;">
        </div>
  
        <!-- Newsletter Title -->
        <div style="text-align: center;text-transform: uppercase; padding: 30px 20px; background-color: #ffffff;">
          <h1 style="color: #333333; font-size: 30px; font-weight: bold; margin: 0; line-height: 1.2;">
            ${newsletter.title}
          </h1>
          <div style="height: 4px; width: 80px; background-color: #4CAF50; margin: 15px auto;"></div>
        </div>
  
        <hr style="width: 70%; border: 1px solid #e0e0e0; margin: 20px auto;">
       <!-- Thumbnail Image -->
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${
            newsletter.thumbnail
          }" alt="Newsletter Thumbnail" style="width: 100%; max-width: 600px; height: auto; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        </div>
        <!-- Content -->
        <p style="font-size: 16px; line-height: 1.6; color: #666666; margin-bottom: 30px; text-align: center; padding: 0 30px;">
          ${newsletter.content}
        </p>
  
        <!-- Call-to-Action Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="https://www.ruralpeace.org/newsletters.html?utm_source=newsletter&utm_medium=email&utm_campaign=october_newsletter" 
             style="background-color: #4CAF50; color: white; padding: 12px 30px; border-radius: 30px; font-size: 18px; text-decoration: none; display: inline-block; transition: background 0.3s ease;">
             Read More
          </a>
        </div>
  
        <!-- Publication Date -->
        <p style="text-align: center; color: #888888; font-size: 14px; margin-bottom: 10px;">
          Published on: ${new Date(newsletter.postTime).toLocaleDateString()}
        </p>
  
        <!-- Social Media Links -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="https://www.facebook.com/profile.php?id=61564819259663" style="margin-right: 15px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" style="width: 36px;">
          </a>
          <a href="https://www.x.com" style="margin-right: 15px;">
            <img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1728604800&semt=ais_hybrid-rr-similar" alt="Twitter" style="width: 36px;">
          </a>
          <a href="https://linkedin.com">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" style="width: 36px;">
          </a>
        </div>
  
        <!-- Footer -->
        <footer style="font-size: 12px; color: #888888; text-align: center; padding: 20px 0; background-color: #ffffff; border-top: 1px solid #e0e0e0; border-radius: 0 0 12px 12px;">
          <p style="margin-bottom: 5px;">You are receiving this email because you subscribed to our newsletter</p>
          <p>Contact us: <a href="mailto:org.ruralpeace@gmail.com" style="color: #4CAF50; text-decoration: none;">org.ruralpleace@gmail.com</a></p>
          <a href="https://www.ruralpeace.org/Newsletter-unsubscription">Unsubscribe</a>
          <p>&copy; ${new Date().getFullYear()} Rural Peace. All rights reserved.</p>
        </footer>
  
      </div>
  
      <!-- Mobile Responsiveness -->
      <style>
      img.CToWUd.a6T {
        border-radius: 6px;
        max-width: 90%;
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }
        @media only screen and (max-width: 600px) {
          div {
            padding: 0 15px !important;
          }
          img {
            max-width: 100% !important;
          }
          h1 {
            font-size: 18px !important;
          }
          p {
            font-size: 14px !important;
          }
          a {
            font-size: 14px !important;
          }
        }
      </style>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending notification email:", error);
    } else {
      console.log("Notification email sent: " + info.response);
    }
  });
};

// POST route to handle newsletter subscriptions
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check if already subscribed
  if (subscribers.includes(email)) {
    return res.status(400).json({ message: "Email already subscribed" });
  }

  // Add email to subscribers
  subscribers.push(email);
  await saveSubscribersToGist();
  // Read the newsletter template
  const templatePath = path.join(__dirname, "newsLetterTemplate.html");
  fs.readFile(templatePath, "utf8", (err, htmlTemplate) => {
    if (err) {
      console.error("Error reading template:", err);
      return res
        .status(500)
        .json({ message: "Failed to send email. Please try again later." });
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Send confirmation email to the subscriber
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Subscription Confirmed!",
      html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Failed to send email. Please try again later." });
      }

      console.log("Email sent: " + info.response);

      res.status(200).json({
        message: `Subscription successful! Please check your email`,
      });
    });
  });
});
// Handle unsubscribe requests
app.post("/unsubscribe", async (req, res) => {
  const { email } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check if the email is in the subscribers list
  const index = subscribers.indexOf(email);
  if (index === -1) {
    return res
      .status(400)
      .json({ message: "Email not found in the subscribers list" });
  }

  // Remove the email from the subscribers list
  subscribers.splice(index, 1);
  await saveSubscribersToGist(); // Save updated subscribers list to Gist

  // Send confirmation email (optional)
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Unsubscription Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Unsubscription Confirmation</h2>
        <p style="color: #555;">Dear Subscriber,</p>
        <p style="color: #555;">We're sorry to see you go! You have been successfully unsubscribed from our newsletter.</p>
        
        <p style="color: #555;">If you have any feedback or suggestions, please don't hesitate to reach out. Your input is invaluable to us!</p>
        
        <p style="color: #555;">If this was a mistake and you'd like to rejoin our community, you can easily <a href="https://www.ruralpeace.org/Newsletter-subscription" style="color: #1a73e8; text-decoration: none; font-weight: bold;">resubscribe here</a>.</p>
        
        <p style="color: #555;">Thank you for your time and support!</p>
        
        <p style="color: #555; margin-top: 40px;">Best regards,<br>Rural Peace ORG.</p>
        
        <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #aaa;">
          <p>© ${new Date().getFullYear()} Rural Peace ORG. All rights reserved.</p>
        </footer>
      </div>
    `,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending confirmation email:", error);
      return res.status(500).json({
        message:
          "Unsubscription successful, but failed to send confirmation email.",
      });
    }

    res
      .status(200)
      .json({ message: "You have been unsubscribed successfully!" });
  });
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "jpg", // Save images as JPG format
    public_id: (req, file) => `resized-${uuidv4()}`, // Generate unique ID for each file
    transformation: [{ width: 1200, height: 900, crop: "limit" }],
  },
});

const upload = multer({ storage: storage });

// Endpoint for uploading and resizing images
app.post("/upload-endpoint", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const fileUrl = req.file.path; // Cloudinary URL for the resized image
    res.json({ url: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing file" });
  }
});
//thumbnail handling
app.post(
  "/upload-thumbnail-endpoint",
  upload.single("thumbnail"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No thumbnail uploaded" });
    }

    try {
      const thumbnailUrl = req.file.path;
      res.json({ url: thumbnailUrl });
    } catch (error) {
      console.error("Cloudinary upload error:", error); // Log full error details
      res.status(500).json({ error: "Error uploading thumbnail" });
    }
  }
);
// Endpoint to create a newsletter
app.post("/create-newsletter", async (req, res) => {
  const { title, content, thumbnail } = req.body;

  const newNewsletter = {
    id: uuidv4(),
    title,
    content,
    thumbnail,
    postTime: new Date().toISOString(),
    clicks: 0,
  };

  newsletters.push(newNewsletter);
  await saveDataToGist(); // Save updated newsletters to Gist
  notifySubscribers(newNewsletter);
  res
    .status(201)
    .json({ message: "Newsletter created successfully!", newNewsletter });
});

// Serve static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/newsletters", (req, res) => {
  res.status(200).json(newsletters);
});

// PUT route to update clicks
app.put("/newsletters/:id", async (req, res) => {
  const { id } = req.params;
  const { clicks } = req.body;

  const newsletter = newsletters.find((n) => n.id === id);
  if (newsletter) {
    newsletter.clicks = clicks;
    await saveDataToGist(); // Save updated newsletters to Gist

    res.status(200).json({ message: "Clicks updated successfully!" });
  } else {
    res.status(404).json({ message: "Newsletter not found" });
  }
});

// DELETE route to delete a newsletter
app.delete("/newsletters/:id", async (req, res) => {
  const { id } = req.params;

  const newsletterIndex = newsletters.findIndex((n) => n.id === id);
  if (newsletterIndex !== -1) {
    newsletters.splice(newsletterIndex, 1); // Remove the newsletter
    await saveDataToGist(); // Save updated newsletters to Gist

    res.status(200).json({
      message: "Newsletter deleted successfully!",
    });
  } else {
    res.status(404).json({ message: "Newsletter not found." });
  }
});

const postsFilePath = path.join(__dirname, "posts.json");
// Load posts data from file (if it exists)

// Load posts from file
if (fs.existsSync(postsFilePath)) {
  const rawData = fs.readFileSync(postsFilePath);
  posts = JSON.parse(rawData);
}

// Function to save posts to file
const savePostsToFile = () => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};
// Middleware to check logged-in user
const checkLoggedIn = (req, res, next) => {
  // Mocking user login check; replace with actual logic
  const user = {
    loggedIn: true,
    email: "user@example.com",
    displayName: "John Doe",
    picture: "profile.jpg",
  };
  req.user = user;
  next();
};

app.get("/api/user", checkLoggedIn, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

app.get("/api/loggedInEmails", (req, res) => {
  res.json(loggedInEmails);
});

app.post("/api/addLoggedInEmail", (req, res) => {
  const { email } = req.body;
  if (!loggedInEmails.includes(email)) {
    loggedInEmails.push(email);
  }
  res.status(200).send();
});

// Endpoint to get global react count
app.get("/api/globalReactCount", (req, res) => {
  const postId = req.query.postId;
  const post = posts[postId] || { globalReactCount: 0 };
  res.json(post.globalReactCount);
});

// Endpoint to check if user has reacted
app.get("/api/reacted", (req, res) => {
  const { postId, email } = req.query;
  const post = posts[postId];
  const hasReacted =
    post && post.reactions ? post.reactions.includes(email) : false;
  res.json(hasReacted);
});

app.post("/api/react", async (req, res) => {
  const { postId, email, hasReacted } = req.body;
  if (!posts[postId]) {
    posts[postId] = { reactions: [], comments: [], globalReactCount: 0 };
  }

  const reactions = posts[postId].reactions;

  if (hasReacted) {
    if (!reactions.includes(email)) {
      reactions.push(email);
    }
  } else {
    const index = reactions.indexOf(email);
    if (index > -1) {
      reactions.splice(index, 1);
    }
  }

  posts[postId].globalReactCount = reactions.length;
  await savePostsToGist(); // Save updated posts to Gist
  res.status(200).send();
});

// Endpoint to submit a new comment
app.post("/api/comments", async (req, res) => {
  const { postId, comment } = req.body;
  if (!posts[postId]) {
    posts[postId] = { reactions: [], comments: [], globalReactCount: 0 };
  }

  posts[postId].comments.push(comment);
  await savePostsToGist(); // Save updated posts to Gist
  res.status(200).send();
});

// Endpoint to get comments for a post
app.get("/api/comments", (req, res) => {
  const postId = req.query.postId;
  const post = posts[postId] || { comments: [] };
  res.json(post.comments);
});

// Endpoint to get replies for a comment
app.get("/api/replies", (req, res) => {
  const { postId, commentId } = req.query;
  const post = posts[postId];
  const comment = post?.comments.find((c) => c.id == commentId) || {
    replies: [],
  };
  res.json(comment.replies || []);
});

// Endpoint to submit a new reply
app.post("/api/replies", async (req, res) => {
  const { postId, commentId, reply } = req.body;
  if (!posts[postId]) {
    posts[postId] = { reactions: [], comments: [], globalReactCount: 0 };
  }

  const comment = posts[postId].comments.find((c) => c.id == commentId);
  if (comment) {
    comment.replies = comment.replies || [];
    comment.replies.push(reply);
  }

  await savePostsToGist(); // Save updated posts to Gist
  res.status(200).send();
});

const donorFilePath = path.join(__dirname, "donors.json");

// Load existing donor data if it exists
if (fs.existsSync(donorFilePath)) {
  const rawData = fs.readFileSync(donorFilePath);
  donors = JSON.parse(rawData);
}

// Save donor data to file
const saveDonorsToFile = () => {
  fs.writeFileSync(donorFilePath, JSON.stringify(donors, null, 2));
};

// Handle donor form submission
app.post("/donerForm", async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    bloodGroup,
    age,
    gender,
    secretCode,
  } = req.body;
  // Calculate age from the date of birth
  const dob = new Date(age);
  const today = new Date();
  let calculatedAge = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    calculatedAge--;
  }
  // Check for duplicate email
  if (donors.some((donor) => donor.email === email)) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // Create a new donor object
  const donor = {
    id: uuidv4(),
    name,
    email,
    phone,
    address,
    bloodGroup,
    age: calculatedAge,
    gender,
    secretCode,
  };

  // Add the donor to the array and save
  donors.push(donor);
  await saveDonorsToGist();
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Thank You for Your Generous Donation!",
    html: `
  <div style="font-family: 'Helvetica', sans-serif; color: #333; background-color: #f4f4f9; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
    
    <!-- Header Section -->
    <div style="background-color: #007bff; padding: 30px; border-radius: 10px 10px 0 0;">
      <h1 style="color: #fff; text-align: center; font-size: 36px; margin: 0;">
        Thank You, ${name}!
      </h1>
    </div>
    
    <!-- Body Content -->
    <div style="padding: 20px; background-color: white; border-radius: 0 0 10px 10px;">
      
      <p style="font-size: 18px; line-height: 1.8; color: #555; text-align: center;">
        <strong>Your generosity is deeply appreciated!</strong> 
      </p>
      
      <p style="font-size: 18px; line-height: 1.8; color: #555;">
        We are <em>thrilled</em> to welcome you as a donor to our cause. Your commitment to helping us make a difference truly means the world. Your details have been successfully saved, and we're excited to show you how your support is making an impact.
      </p>

      <!-- Call to Action Button -->
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://www.ruralpeace.org/Home" style="text-decoration: none; background-color: #ff4757; color: white; padding: 15px 30px; font-size: 18px; border-radius: 50px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
          Visit Our Website
        </a>
      </div>

      <!-- Additional Message -->
      <p style="font-size: 18px; line-height: 1.8; color: #555; text-align: center; margin-top: 30px;">
        You are part of something truly <strong>special</strong>! Together, we will make lasting, meaningful change.
      </p>
    </div>

    <!-- Footer Section -->
    <div style="margin-top: 30px; padding: 20px; text-align: center; background-color: #f9f9fb; border-radius: 10px;">
      <p style="font-size: 16px; color: #777;">
        Warm Regards,<br>
        <strong>RURAL PEACE ORG.</strong><br>
        <em>Making the world a better place, together 🌍</em>
      </p>
    </div>

  </div>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ message: "Failed to send confirmation email" });
    }

    console.log("Confirmation email sent: " + info.response);
    res.status(200).json({ message: "Donor registered successfully!" });
  });
});
// GET route to retrieve all donors
app.get("/donors", (req, res) => {
  res.status(200).json(donors);
});
//update data
// GET route to retrieve a specific donor's information
app.get("/donor/:email/:secretCode", (req, res) => {
  const { email, secretCode } = req.params;

  const donor = donors.find(
    (donor) => donor.email === email && donor.secretCode === secretCode
  );

  if (!donor) {
    return res
      .status(404)
      .json({ message: "Donor not found or invalid secret code" });
  }

  res.status(200).json(donor);
});

// Handle donor account update
app.put("/updateDonor", async (req, res) => {
  const { email, secretCode, updateData } = req.body;

  const donorIndex = donors.findIndex(
    (donor) => donor.email === email && donor.secretCode === secretCode
  );

  if (donorIndex === -1) {
    return res
      .status(404)
      .json({ message: "Donor not found or invalid secret code" });
  }

  const donor = donors[donorIndex];
  donors[donorIndex] = { ...donor, ...updateData };
  await saveDonorsToGist(); // Save updated donors to Gist
  res.status(200).json({ message: "Donor account updated successfully" });
});

// Handle donor account deletion
app.delete("/deleteDonor", async (req, res) => {
  const { email, secretCode } = req.body;

  const donorIndex = donors.findIndex(
    (donor) => donor.email === email && donor.secretCode === secretCode
  );

  if (donorIndex === -1) {
    return res
      .status(404)
      .json({ message: "Donor not found or invalid secret code" });
  }

  donors.splice(donorIndex, 1); // Remove the donor from the array
  await saveDonorsToGist(); // Save updated donors to Gist
  res.status(200).json({ message: "Donor account deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}/home`);
});
// Graceful shutdown
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed gracefully");
    process.exit(0);
  });
});

//almost
