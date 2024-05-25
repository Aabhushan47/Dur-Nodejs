const Category = require("../models/categoryModel");

exports.testFunction = (req, res) => {
  res.send("This is from category controller");
};

//add category
exports.categoryPost = async (req, res) => {
  try {
    const data = req.body; // assuming req body contains category data

    // Check if the category already exists
    const existingCategory = await Category.findOne({
      category_name: data.category_name,
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already in database" });
    }

    // Create a new Category document using mongoose schema
    const newCategory = new Category(data);

    // Save the new category to the database
    const response = await newCategory.save();
    console.log("Category Data Saved");

    res.status(200).json(response);
  } catch (err) {
    console.error("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get category details

exports.categoryGet = async (req, res) => {
  try {
    const response = await Category.find();
    console.log("Data retrieved");
    res.status(200).json(response);
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get single category details by id

exports.categoryGetSingle = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const response = await Category.findById(categoryId);
    console.log("Data retrieved");
    res.status(200).json(response);
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update category details

exports.categoryUpdate = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    const response = await Category.findByIdAndUpdate(categoryId, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ error: "Category Name not found" });
    }
    console.log("Category Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.categoryDelete = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const response = await Category.findByIdAndDelete(categoryId);
    if (!response) {
      res.status(404).json({ error: "Category Name not found" });
    }
    console.log("Category Data Deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log("Internal Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
