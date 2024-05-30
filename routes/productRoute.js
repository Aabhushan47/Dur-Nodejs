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
const { requireSignin, requireAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post(
  "/product",
  upload.single("image"),
  productValidation,
  validation,
  requireSignin,
  productPost
);
router.get("/product", productGet);
router.get("/product/:id", productDetail);
router.put(
  "/product/:id",
  upload.single("image"),
  productValidation,
  validation,
  requireSignin,
  requireAdmin,
  productUpdate
);
router.delete("/product/:id", requireSignin, requireAdmin, productDelete);

module.exports = router;
