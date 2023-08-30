const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config();
router.get("/", async(req, res)=>{
    try{
    const token = req.cookies.authToken
    let details = jwt.verify(token, process.env.JWTKEY)
    res.render("pages/checkout", {
        cookies: req.cookies,   
        name: details.name,
        email: details.email,
        phone: details.phone,
        total: req.cookies.total
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
router.post("/", async(req, res)=>{
    // console.log(req.body.items)
    try{
        const token = req.cookies.authToken
        const total = req.body.total
        res.cookie("total", total)
        let details = jwt.verify(token, process.env.JWTKEY)
        res.render("pages/checkout", {
            cookies: req.cookies,   
            name: details.name,
            email: details.email,
            phone: details.phone,
            items: req.body.items,
            total: req.body.total
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
module.exports = router;
