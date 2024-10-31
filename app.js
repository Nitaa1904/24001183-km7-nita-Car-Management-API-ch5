const express = require('express');
const morgan = require("morgan");
const expressEjsLayout = require("express-ejs-layouts");
const path = require("path");
const systemController = require('./controllers/systemController');


require("dotenv").config();

const sequelize = require("./config/database");
const router = require('./routes');

const app = express();
const port = process.env.DB_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.set("layout", "layout");

app.get("/api/v1/health-check", systemController.healtcheck);
app.use("/api/v1", router);

module.exports = app;
