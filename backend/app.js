const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;
