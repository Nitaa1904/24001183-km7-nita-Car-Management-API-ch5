const express = require("express");
const router = express.Router();

const userRoute = require('./userRoute');
const carRoute = require('./carRoute');

router.use('/users', userRoute);
router.use('/cars', carRoute);

module.exports = router;