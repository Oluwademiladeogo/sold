const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>{
    res.render("pages/index")
})
router.get("/aboutus", (req, res)=>{
    res.render("pages/aboutus")
})
router.get("/login", (req, res)=>{
    res.render("pages/login")
})
router.get("/cart", (req, res)=>{
    res.render("pages/cart")
})
module.exports = router;