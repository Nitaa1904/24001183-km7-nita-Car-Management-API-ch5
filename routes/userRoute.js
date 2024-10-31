const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/uploader");

//Route disini

router.get("/", userController.readAllUsers);
router.get("/detail/:id", userController.getUserbyId);
router.post("/", upload.single("foto_profil"), userController.createUser);
router.get("/create", userController.createPage);
router.post("/create", upload.single("foto_profil"), userController.createUser);
router.get("/edit/:id", userController.editPage);
router.post("/:id", upload.single("foto_profil"), userController.updateUser);

module.exports = router;
