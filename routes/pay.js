const express = require("express")
const router = express.Router()
router.get("/", async(req, res)=>{
    res.render("pages/pay", {cookies: req.cookies, paywithcard: ""})

})
router.post("/", (req, res)=>{
    // console.log(req.body.paymethod)
    if(req.body.paymethod === "paywithcard"){
        res.render("pages/pay", {
            cookies: req.cookies,
            paywithcard: true,
            total: req.cookies.total
        })
    }
    if(req.body.paymethod === "paywithoutcard"){
        res.render("pages/pay", {
            cookies: req.cookies,
            paywithcard: false,
            total: req.cookies.total
        })
        res.clearCookie("cartitem")
    }
})
module.exports = router;