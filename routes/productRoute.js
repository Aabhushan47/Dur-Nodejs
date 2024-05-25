const express = require("express");
const upload = require("../middlewares/fileupload");

const {
  productPost,
  productGet,
  productDetail,
  productUpdate,
  productDelete,
} = require("../controllers/productController");
const { productValidation, validation } = require("../validation/validator");
const router = express.Router();

router.post(
  "/product",
  upload.single("image"),
  productValidation,
  validation,
  productPost
);
router.get("/product", productGet);
router.get("/product/:id", productDetail);
router.put(
  "/product/:id",
  upload.single("image"),
  productValidation,
  validation,
  productUpdate
);
router.delete("/product/:id", productDelete);

module.exports = router;
