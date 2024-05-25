const express = require("express");
const {
  signUp,
  confirmEmail,
  login,
  forgotPassword,
} = require("../controllers/userController");
const router = express.Router();
const upload = require("../middlewares/fileupload");

router.post("/register", upload.single("photo"), signUp);
router.post("/confirmation/:token", confirmEmail);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);

module.exports = router;
