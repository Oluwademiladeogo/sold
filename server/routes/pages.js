const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>{
    res.render("pages/index", {
        title: "home"
    })
})
router.get("/aboutus", (req, res)=>{
    res.render("pages/aboutus", {
        title: 'Aboutus'
    })
})
module.exports = router;