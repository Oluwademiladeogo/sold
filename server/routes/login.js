const express = require("express")
const mongoose = require("mongoose")
const {loginschema, schema} = require("../models/loginschema")
const router = express.Router()
router.get("/", (req, res)=>{
    res.render("pages/login")
})
router.post("/", (req, res)=>{
     let user = loginschema.findOne({email: req.body.email})
    //  if(!user) return 
    res.redirect("/")
    //something with cookies
})
module.exports = router;