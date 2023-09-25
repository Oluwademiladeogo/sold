const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("pages/aboutus", { cookies: req.cookies });
});

module.exports = router;
