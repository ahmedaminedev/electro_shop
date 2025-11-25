
const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');

exports.getProducts = catchAsync(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

exports.getProductById = catchAsync(async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
});

exports.createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  
  // Auto-generate numeric ID if missing (using timestamp is simple and effective for this scale)
  if (!productData.id) {
      productData.id = Date.now();
  }

  const product = new Product(productData);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

exports.updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (product) {
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.params.id });
  if (product) {
    res.json({ message: 'Produit supprimé' });
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
});
