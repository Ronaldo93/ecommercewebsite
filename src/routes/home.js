const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '..' + '/public/html/index.html');
});

module.exports = router;