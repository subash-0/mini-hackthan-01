const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const addProduct = async (req, res) => {
  const { price, name } = req.body;
  if (!price || !name) {
    throw new CustomError.BadRequestError("Enter both price and name");
  }
  const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw CustomError.NotFoundError("Product not found");
  }
  res.status(StatusCodes.OK).json(product);
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw CustomError.NotFoundError("Product not found");
  }
  await product.delete();

  res.status(StatusCodes.OK).json({ msg: "product removed" });
};

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct };
