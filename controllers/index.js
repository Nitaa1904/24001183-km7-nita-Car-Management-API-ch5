const express = require("express");

const userRoute = require('./userController');
const carRoute = require('./carController');
const systemController = require("./systemController");

module.exports = {
    userRoute,
    carRoute,
    systemController,
}
