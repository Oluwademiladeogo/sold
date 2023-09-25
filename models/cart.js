const mongoose = require("mongoose");
const cartschema = mongoose.model(
  "cart",
  new mongoose.Schema({
    card: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 7,
    },
    cardname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 70,
    },
    quantity: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 3,
    },
    price: {
      type: String,
      required: true,
      maxlength: 10,
    },
  })
);
module.exports = { cartschema };
