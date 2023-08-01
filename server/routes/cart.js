const express = require("express")
const router = express.Router()
router.get("/", (req, res)=>{
    res.render("pages/cart", {session: req.session})

})

module.exports = router;
