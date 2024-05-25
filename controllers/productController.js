const Product = require("../models/productModel");

exports.productPost = async (req, res) => {
  try {
    const productData = {
      product_name: req.body.product_name,
      description: req.body.description,
      price: req.body.price,
      sales: req.body.sales,
      image: req.file.path,
      rating: req.body.rating,
      stock: req.body.stock,
      category: req.body.category,
    };
    //check if product exist in db
    Product.findOne({ product_name: productData.product_name }).then(
      async (products) => {
        if (products) {
          return res.status(400).json("Product already in database");
        } else {
          const newProduct = new Product(productData);
          const response = await newProduct.save();
          console.log("data saved");
          res.status(200).json(response);
        }
      }
    );
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.productGet = async (req, res) => {
  try {
    const response = await Product.find().populate("category", "category_name");
    console.log("data retrieved");
    res.status(200).json(response);
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.productDetail = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await Product.findById(productId).populate(
      "category",
      "category_name"
    );
    console.log("data retrieved");
    res.status(200).json(response);
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.productUpdate = async (req, res) => {
  try {
    const productData = {
      product_name: req.body.product_name,
      description: req.body.description,
      price: req.body.price,
      sales: req.body.sales,
      rating: req.body.rating,
      image: req.file.path,
      stock: req.body.stock,
      category: req.body.category,
    };
    const productId = req.params.id;
    const response = await Product.findByIdAndUpdate(productId, productData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ error: "Product Not Found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.productDelete = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await Product.findByIdAndDelete(productId);
    if (!response) {
      res.status(404).json({ error: "Product Not Found" });
    }
    console.log("data deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
