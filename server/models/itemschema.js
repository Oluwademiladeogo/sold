const mongoose = require("mongoose")
const itemschema = mongoose.model("items", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    price: {
        type: String,
        requried: true,
        minlength: 3,
        maxlength: 10
    }
}))
module.exports = {itemschema}