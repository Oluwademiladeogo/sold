const express = require("express")
const router = express.Router()
router.get("/", (req, res)=>{
    res.render("pages/index", {session: req.session})
    console.log(req.session)
})
router.get("/card1", (req, res)=>{
    res.render("pages/card/card1", {session: req.session})
    console.log(req.session)
})

router.get("/card2", (req, res)=>{
    res.render("pages/card/card2", {session: req.session})
    console.log(req.session)
})
router.get("/card3", (req, res)=>{
    res.render("pages/card/card3", {session: req.session})
    console.log(req.session)
})
router.get("/card4", (req, res)=>{
    res.render("pages/card/card4", {session: req.session})
    console.log(req.session)
})
router.get("/card5", (req, res)=>{
    res.render("pages/card/card5", {session: req.session})
    console.log(req.session)
})
router.get("/card6", (req, res)=>{
    res.render("pages/card/card6", {session: req.session})
    console.log(req.session)
})
router.get("/card7", (req, res)=>{
    res.render("pages/card/card7", {session: req.session})
    console.log(req.session)
})
router.get("/card8", (req, res)=>{
    res.render("pages/card/card8", {session: req.session})
    console.log(req.session)
})
router.get("/card9", (req, res)=>{
    res.render("pages/card/card9", {session: req.session})
    console.log(req.session)
})
router.get("/card10", (req, res)=>{
    res.render("pages/card/card10", {session: req.session})
    console.log(req.session)
})
router.get("/card11", (req, res)=>{
    res.render("pages/card/card11", {session: req.session})
    console.log(req.session)
})
router.get("/card12", (req, res)=>{
    res.render("pages/card/card12", {session: req.session})
    console.log(req.session)
})

router.post("/", (req, res)=>{
    
})

module.exports = router;
