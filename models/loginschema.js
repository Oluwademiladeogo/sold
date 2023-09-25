const mongoose = require("mongoose");
const loginschema = mongoose.model(
  "login",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    phone: {
      type: String,
      minlength: 5,
      maxlength: 20,
      required: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  })
);
module.exports = { loginschema };
