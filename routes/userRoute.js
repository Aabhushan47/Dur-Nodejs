const express = require("express");
const {
  signUp,
  confirmEmail,
  login,
  forgotPassword,
  resetPassword,
  getUserData,
  userDetails,
  signOut,
} = require("../controllers/userController");
const router = express.Router();
const upload = require("../middlewares/fileupload");
const { requireSignin } = require("../middlewares/auth");
const {
  registerValidation,
  validation,
  passwordValidation,
} = require("../validation/validator");

router.post(
  "/register",
  upload.single("photo"),
  registerValidation,
  passwordValidation,
  validation,
  signUp
);
router.post("/confirmation/:token", confirmEmail);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post(
  "/resetpassword/:token",
  registerValidation,
  passwordValidation,
  validation,
  resetPassword
);
router.get("/userlist", requireSignin, getUserData);
router.get("/userdetail/:id", requireSignin, userDetails);
router.post("/logout", signOut);

module.exports = router;
