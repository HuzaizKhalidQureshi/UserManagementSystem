//importing express libraries

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

//important module files

const route = require("./server/routes/router");
const connectDB = require("./server/database/connection");

//creating app instance

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

//calling database connection

connectDB();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.set("views",path.resolve(__dirname,views/ejs))
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.use("/", route);

app.listen(PORT, () => {
  console.log(`App is listening to http://localhost:${PORT}`);
});
