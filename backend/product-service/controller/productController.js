const Product = require("../model/Product");
const {
  sendSuccess,
  sendError,
  sendNotFound,
} = require("../tools/responseHelper");

const { isValidObjectId } = require("../tools/isValidObjectId");

const fs = require("fs");
const path = require("path");

// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return sendSuccess(res, products);
  } catch (error) {
    return sendError(res, error.message);
  }
};

// GET product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, "Invalid product ID", 400);
    }

    const product = await Product.findById(id);

    if (!product) {
      return sendNotFound(res, "Produit");
    }

    return sendSuccess(res, product);
  } catch (error) {
    return sendError(res, error.message);
  }
};

// POST new product
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      image: req.file ? req.file.path : null,
    });

    const savedProduct = await product.save();
    return sendSuccess(res, savedProduct, 201);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

// UPDATE product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, "Invalid product ID", 400);
    }

    const product = await Product.findById(id);

    if (!product) {
      return sendNotFound(res, "Produit");
    }

    if (req.file) {
      if (product.image && fs.existsSync(product.image)) {
        fs.unlinkSync(product.image);
      }
      req.body.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return sendSuccess(res, updatedProduct);
  } catch (error) {
    return sendError(res, error.message);
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, "Invalid product ID", 400);
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return sendNotFound(res, "Produit");
    }

    return sendSuccess(res, { message: "Produit supprimé avec succès" });
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
