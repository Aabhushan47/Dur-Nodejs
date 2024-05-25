const { check, validationResult } = require("express-validator");

exports.categoryValidation = [
  check("category_name", "category is required")
    .notEmpty()
    .isLength({ min: 3 })
    .trim()
    .withMessage("category name must be of 3 charac"),
];

exports.productValidation = [
  check("product_name", "product name is required")
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 charac"),
  check("description", "description is required")
    .notEmpty()
    .trim()
    .isLength({ min: 10 })
    .withMessage("description must be more than 10 charac"),
  check("price", "price is required")
    .notEmpty()
    .isNumeric()
    .withMessage("price must be in number"),
  check("sales", "sales is required")
    .notEmpty()
    .isNumeric()
    .withMessage("sales must be in number"),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    return res.status(400).send({ error: errors.array()[0].msg });
  }
};
