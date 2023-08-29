const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const {loginschema} = require("../models/loginschema")
const bcrypt = require("bcrypt")
require("dotenv").config();
router.get("/", async(req, res)=>{
    try{
    let message= ""
    const token = req.cookies.authToken
    let details = jwt.verify(token, process.env.JWTKEY)
    res.render("pages/editprofile", {
        message: message,
        cookies: req.cookies,   
        name: details.name,
        email: details.email,
        phone: details.phone
    })
}
catch (err){
    // console.log(err.message)
    let message = "You need to login to view this page"
    res.status(401).render("pages/error", {
        message: message,
        cookies: req.cookies,
        errcode: 401,
        link: "/logout"
        })
}
})
router.post("/", async(req, res)=>{
    try{    
        let user = await loginschema.findOne({email: req.body.newemail})
        if(!user){
             req.flash("message", "User should be logged in to do this")
        res.render("pages/login", {message: req.flash("message"), redirect: false}) 
        }
        if(req.cookies.authToken){            
            bcrypt.compare(req.body.currentpassword, user.password, async(result)=>{
                if(result){
                    if(req.body.newpassword === req.body.confirmpassword){
                        //All things being equal, edit the user
                        if((req.newpassword > 1) && (req.body.confirmpassword > 1)){
                            salt = bcrypt.genSalt(10)
                            user.password = await bcrypt.hash(req.body.newpassword, salt)
                            user.salt = salt
                        }
                        user.name = req.body.newname
                        user.email = req.body.newemail
                        user.phone = req.body.newphone
                        await user.save();
                    //edit the jwt token
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
                req.flash('message', 'Change successful'); // Set a flash message
                res.render("pages/editprofile", {
                    message: req.flash("message"),
                    redirect: true,
                    cookies: req.cookies,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                    })
                    }
                    else{
                        req.flash("message", "new passwords don't match")
                        res.render("pages/editprofile", {
                            message: req.flash("message"),
                            redirect: false,
                            cookies: req.cookies,
                            name: req.body.newname,
                            email: req.body.newemail,
                            phone: req.body.newphone
                        })       
                    }
                }
                else{
                    req.flash("message", "Please Enter Current Password to Edit")
                    res.render("pages/editprofile", {
                        message: req.flash("message"),
                        redirect: false,
                        cookies: req.cookies,
                        name: req.body.newname,
                        email: req.body.newemail,
                        phone: req.body.newphone
                    })
                }
            })
        }
        else{
            req.flash("message", "User should be logged in to do this")
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
