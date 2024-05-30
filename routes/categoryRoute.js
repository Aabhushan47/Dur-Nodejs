const express = require("express");
const router = express.Router();

//import function from controller
const {
  testFunction,
  categoryPost,
  categoryGet,
  categoryUpdate,
  categoryDelete,
  categoryGetSingle,
} = require("../controllers/categoryController");
const { categoryValidation, validation } = require("../validation/validator");
const { requireSignin, requireAdmin } = require("../middlewares/auth");

//get method for test
router.get("/", testFunction);

//Post method for category

router.post(
  "/category",
  categoryValidation,
  validation,
  requireSignin,
  requireAdmin,
  categoryPost
);

//get method for category and detail of single category

router.get("/category", requireSignin, requireAdmin, categoryGet);

router.get("/category/:id", requireSignin, requireAdmin, categoryGetSingle);

//update Category

router.put(
  "/category/:id",
  categoryValidation,
  validation,
  requireSignin,
  requireAdmin,
  categoryUpdate
);

//delete category

router.delete("/category/:id", requireSignin, requireAdmin, categoryDelete);

module.exports = router;
