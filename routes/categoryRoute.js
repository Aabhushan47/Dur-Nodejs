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

//get method for test
router.get("/", testFunction);

//Post method for category

router.post("/category", categoryValidation, validation, categoryPost);

//get method for category and detail of single category

router.get("/category", categoryGet);

router.get("/category/:id", categoryGetSingle);

//update Category

router.put("/category/:id", categoryValidation, validation, categoryUpdate);

//delete category

router.delete("/category/:id", categoryDelete);

module.exports = router;
