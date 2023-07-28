const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const {loginschema, schema} = require("../models/loginschema")
router.get("/", (req, res)=>{
    let message = '';
    res.render("pages/signup", {message})
})
router.post("/", async(req, res)=>{
    let user = await loginschema.findOne({email: req.body.email})
    if(user){
        req.flash("message", "User already registered")
        res.render("pages/signup", {message: req.flash("message"), redirect: true})
    }
    else{user = new loginschema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    await user.save();
    req.flash("message", "user saved")
    res.render("pages/signup", {message: req.flash("message"), redirect: true})
    }
    
})
module.exports = router;