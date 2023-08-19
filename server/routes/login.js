const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {loginschema} = require("../models/loginschema")
const router = express.Router()
router.get("/", (req, res)=>{
    let message = '';
    res.render("pages/login", {message, redirect: false})
})
router.post("/", async(req, res)=>{
        try{
let user = await loginschema.findOne({email: req.body.email})
     if(!user){
            req.flash("message", "Invalid email or password")
        res.render("pages/login", {message: req.flash("message"), redirect: false}) 
        
        }
        if(!req.cookies.authToken){
        const passwordentered = req.body.password
        const passkey = user.password
        bcrypt.compare(passwordentered, passkey, (result)=>{
             if(result){
                let expires = Math.floor(Date.now()/1000) + 60 * 60 * 24 * 5 //5 days
                let payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                exp: expires
                }
                let token = jwt.sign(payload, process.env.JWTKEY);
                req.session.userID = user._id;
                res.cookie('authToken', token); // Store the token in a cookie
                req.flash('message', 'Login successful'); // Set a flash message
                res.render("pages/login", {message: req.flash("message"), redirect: true})
            }       
    
     else{
        req.flash("message", "Invalid email or password")
        res.render("pages/login", {message: req.flash("message"), redirect: false}) 
 }
    }
     )}
     else{
        req.flash("message", "Invalid")
        res.render("pages/login", {message: req.flash("message"), redirect: false}) 
 }
}
catch(err){
    req.flash("message", "Something broke!, We're working to get it fixed")
    res.status(500).render("pages/error", {
        message: req.flash("message"),
        cookies: req.cookies,
        errcode: 500,
        link: "/index"
        })
}
        
    })
module.exports = router;