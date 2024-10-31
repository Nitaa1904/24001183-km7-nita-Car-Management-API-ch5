const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/uploader");

//Route disini

router.get("/", userController.findUsers);
router.get('/:id', userController.findUserById);
router.patch('/:id', userController.updateUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;