const express = require("express")
const router = express.Router()
router.get("/", (req, res)=>{
    res.render("pages/index", {session: req.session})
})
router.post("/", (req, res)=>{
    
})

module.exports = router;
