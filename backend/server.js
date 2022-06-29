const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//Config
dotenv.config({ path: "backend/config/config.env" });

//Connecting to MongoDB database
connectDatabase();

const port = process.env.PORT | 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
