const express = require("express")
const mongoose = require("mongoose")
const {loginschema, schema} = require("../models/loginschema")
const router = express.Router()
router.get("/", (req, res)=>{
    res.render("pages/login")
})
router.post("/", (req, res)=>{
    
})
module.exports = router;