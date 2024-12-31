const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/googleLoginDB", {});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
});

const User = mongoose.model("User", userSchema);

app.post("/api/users", async (req, res) => {
  const { firstName, lastName, email, gender } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      gender,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User saved successfully!", user: newUser });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Failed to save user data." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
