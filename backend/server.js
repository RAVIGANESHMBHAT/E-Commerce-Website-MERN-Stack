const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down the server due to Uncaught exception!!!`);
  process.exit(1);
});

//Config
dotenv.config({ path: "backend/config/config.env" });

//Connecting to MongoDB database
connectDatabase();

const port = process.env.PORT | 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection!!!`);

  server.close(() => {
    process.exit(1);
  });
});
