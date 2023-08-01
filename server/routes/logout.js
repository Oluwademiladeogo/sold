const express = require("express")
const router = express.Router()
router.get('/', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('connect.sid', { expires: new Date(0) });
        res.redirect('/');
      }
    });
  });
  module.exports = router;