const express = require("express")
const router = express.Router()
router.get("/", (req, res)=>{
    res.render("pages/index", {cookies: req.cookies})
     
})
router.get("/card1", (req, res)=>{
    res.render("pages/card/card1", {cookies: req.cookies})
     
})

router.get("/card2", (req, res)=>{
    res.render("pages/card/card2", {cookies: req.cookies})
     
})
router.get("/card3", (req, res)=>{
    res.render("pages/card/card3", {cookies: req.cookies})
     
})
router.get("/card4", (req, res)=>{
    res.render("pages/card/card4", {cookies: req.cookies})
     
})
router.get("/card5", (req, res)=>{
    res.render("pages/card/card5", {cookies: req.cookies})
     
})
router.get("/card6", (req, res)=>{
    res.render("pages/card/card6", {cookies: req.cookies})
     
})
router.get("/card7", (req, res)=>{
    res.render("pages/card/card7", {cookies: req.cookies})
     
})
router.get("/card8", (req, res)=>{
    res.render("pages/card/card8", {cookies: req.cookies})
     
})
router.get("/card9", (req, res)=>{
    res.render("pages/card/card9", {cookies: req.cookies})
     
})
router.get("/card10", (req, res)=>{
    res.render("pages/card/card10", {cookies: req.cookies})
     
})
router.get("/card11", (req, res)=>{
    res.render("pages/card/card11", {cookies: req.cookies})
     
})
router.get("/card12", (req, res)=>{
    res.render("pages/card/card12", {cookies: req.cookies})
     
})

router.post("/", (req, res)=>{
    
})

module.exports = router;
