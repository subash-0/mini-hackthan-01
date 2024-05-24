const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ["Please provide name"]],
  },
  price: {
    type: Number,
    requried: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
