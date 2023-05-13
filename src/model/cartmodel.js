const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter your product price"],
  },
  productThumbnail: {
    type: String,
    required: [true, "Please enter your product image"],
  },
  // quantity: {
  //   type: Number,
  //   required: [true, "Please enter your product quantity"],
  // },
  userName: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  productId: {
    type: String,
    required: [true, "Please enter your product id"],
  },
  productDistributionHub: {
    type: String,
    required: [true, "Please enterDistribution Hub"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address"],
  },
  // Stock: {
  //   type: Number,
  //   required: [true, "Please enter your product stock"],
  // }
});

module.exports = mongoose.model("Cart", cartSchema);
