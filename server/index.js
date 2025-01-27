const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const StudentModel1 = require("./models/formData");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."), false);
    }
  },
});

let uri =
  "mongodb+srv://HarishKumar:K4rjaeujuf0r0Hmo@cluster0.4st5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Specify your frontend URL here

// Serve the uploaded files statically
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/", upload.single("profileImage"), async (req, res) => {
  console.log(req.body); // Correct log for incoming form data
  try {
    const { username, email, department, projectLinks, description } = req.body;
    const profileImage = req.file; // Contains details about the uploaded file

    // Create a new student record
    const newStudent = new StudentModel1({
      username,
      email,
      department,
      projectLinks,
      description,
      profileImage: profileImage
        ? `/uploads/${profileImage.filename}` // Store the file path
        : null,
    });

    // Save to the database
    await newStudent.save();

    res.status(201).json({
      message: "User registered successfully",
      newStudent,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({
      error: error.message || "Failed to register user",
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
