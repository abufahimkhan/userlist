const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors()); //kept cross origin if needed later here
app.use(express.json());
//http://localhost:5000/getData
app.get("/getData", async (request, response) => {
  try {
    const { data } = await axios.get("https://dummyjson.com/users");
    response.json(data);
  } catch (error) {
    console.log("Error Fetching Users:", error);
    response.status(500).json({ error: "Failed to fetch users" });
  }
});

// Fetch user by ID
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(`https://dummyjson.com/user/${id}`);
    res.json(data);
  } catch (error) {
    console.log("Error Fetching User:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Array to store users
// Needed End point to post new user. Just a structure of post request for a new user.
const users = [];

// POST endpoint to add a new user
app.post("/addUser", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
