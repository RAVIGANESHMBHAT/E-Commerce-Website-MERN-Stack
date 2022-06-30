const Product = require("../models/productModel");

// Create Product -- Admin
module.exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
};

// Get All Products
module.exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};

// Update Product -- Admin
module.exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found!",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({ success: true, product })
};
