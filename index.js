const express = require("express");

const apiRoutes = require("./apis");

const app = express();
const port = 3101; // Port number to run the server

// Middleware for parsing JSON data
app.use(express.json());

// Simple GET route
app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to the Node.js Express server.");
});

// Simple GET route
app.use("/api", apiRoutes);

// Route for not found (404)
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
