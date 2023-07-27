const mongoose = require("mongoose")
const joi = require("joi")
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
const schema = joi.object({
    name: joi.string().length(50).required(),
    price: joi.string().length(10).required()
})
module.exports = {
    itemschema, schema
}