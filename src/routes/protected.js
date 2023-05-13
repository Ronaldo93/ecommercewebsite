const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    console.log("Protected for good!");
});

module.exports = router;