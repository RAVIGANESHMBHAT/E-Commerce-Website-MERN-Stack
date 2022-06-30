const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error")

// Route Imports
const product = require("./routes/productRoute");

app.use(express.json());
app.use("/api/v1", product);

// Middleware for Error
app.use(errorMiddleware)

module.exports = app;
