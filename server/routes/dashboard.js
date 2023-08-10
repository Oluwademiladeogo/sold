const express = require("express")
const router = express.Router()
const { loginschema, schema } = require("../models/loginschema")
router.get("/", (req, res)=>{
    const name = req.session.name
    const email = req.session.email
    const user = loginschema.findOne({email: email})
    res.render("pages/dashboard", {
        session: req.session,   
        name: req.session.name,
        email: req.body.email,
        phone: req.body.number
    })
    console.log(name + user)
})

module.exports = router;
