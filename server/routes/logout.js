const express = require("express")
const router = express.Router()
router.get('/', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('newname');
        console.log('After', req.session);
        res.redirect('/');
      }
    });
  });
  module.exports = router;