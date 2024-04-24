const express = require("express");
const path = require("path");

const app = express();

// Define the directory from which to serve files
const directoryToServe = "public";
const port = 3000;

// Middleware to serve files from the specified directory
app.use(express.static(path.join(__dirname, directoryToServe)));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
