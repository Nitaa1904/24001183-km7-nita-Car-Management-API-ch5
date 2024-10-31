const express = require("express");
const morgan = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");
const path = require("path");

const {errorMiddleware, notFoundMiddleware } = require("./middlewares")
require("dotenv").config();

const sequelize = require("./config/database");
const indexRoute = require("./routes");

const app = express();
const port = process.env.DB_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan(dev));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/", async (req, res) => {
//   try {
//     await sequelize.authenticate();
//     res.status(200).sendFile(path.join(__dirname, "views", "welcome.html"));
//   } catch (error) {
//     res.status(500).sendFile(path.join(__dirname, "views/errors", "500.html"));
//   }
// });

app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.set("layout", "layout");

// app.use("/dashboard", indexRoute);

// kesalahan
errorMiddleware,
notFoundMiddleware

