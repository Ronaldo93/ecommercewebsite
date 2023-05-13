// User-related routes
const express = require('express');
const router = express.Router();


// @route GET /logout
// @desc logout user
// @access public
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;