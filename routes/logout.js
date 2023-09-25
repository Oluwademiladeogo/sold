const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  try {
    res.clearCookie("authToken");
    // console.log(req.cookies.authToken)

    req.flash("message", "Logged out successfully");
    res.render("pages/login", {
      message: req.flash("message"),
      cookies: req.cookies,
      redirect: true,
    });
  } catch (err) {
    console.log(err.message);
    let message = "Something broke";
    res.status(500).render("pages/error", {
      message: message,
      cookies: req.cookies,
      errcode: 500,
      link: "/login",
    });
  }
});
module.exports = router;
