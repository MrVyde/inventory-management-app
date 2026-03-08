require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// parse the incoming data and put it into req.body.”
app.use(express.urlencoded({ extended: true }));

// Tell Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Route
const categoryRouter = require("./routes/categoryRouter");
app.use("/", categoryRouter);

const itemRouter = require("./routes/itemRouter");
app.use("/items", itemRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:${PORT}`);
});

