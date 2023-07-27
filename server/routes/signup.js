const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const {loginschema, schema} = require("../models/loginschema")
router.get("/", (req, res)=>{
    res.render("pages/signup")
})
router.post("/", async(req, res)=>{
    let user = await loginschema.findOne({email: req.body.email})
    // if(user) connect flash comes in here
    if(!user){user = new loginschema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    await user.save();
    

    }
    
    res.redirect("/login")
})
module.exports = router;