const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config();
router.get("/", async(req, res)=>{
    try{
    const token = req.cookies.authToken
    let details = jwt.verify(token, process.env.JWTKEY)
    res.render("pages/dashboard", {
        cookies: req.cookies,   
        name: details.name,
        email: details.email,
        phone: details.phone
    })
}
catch (err){
    console.log(err.message)
    let message = "You need to login to view this page"
    res.status(401).render("pages/error", {
        message: message,
        cookies: req.cookies,
        errcode: 401,
        link: "/logout"
        })
}
})

module.exports = router;
