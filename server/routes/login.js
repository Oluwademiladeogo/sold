const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {loginschema, schema} = require("../models/loginschema")
const { salt } = require("./signup")
const router = express.Router()
router.get("/", (req, res)=>{
    let message = '';
    res.render("pages/login", {message})
})
router.post("/", async(req, res)=>{
     let user = await loginschema.findOne({email: req.body.email})

     if(!user){
            req.flash("message", "Invalid email or password")
        res.render("pages/login", {message: req.flash("message")}) 
        
        }
        if(!req.session.userID){
        const passwordentered = req.body.password
        const storedpassword = await loginschema.findOne({email: req.body.email})
        const passkey = await bcrypt.hash(passwordentered, storedpassword.salt)
        console.log(passkey)
        bcrypt.compare(passwordentered, passkey, (err, result)=>{
             if(result){
                
                req.session.userID = user._id
                req.session.name = user.name
                req.session.email = user.email
                req.session.phone = user.phone
                console.log(req.session.userID)
                 res.redirect('/')
             }
     else{
        req.flash("message", "Invalid email or password")
        res.render("pages/login", {message: req.flash("message")}) 
     }
        })
        }
    }
        
    
)
module.exports = router;