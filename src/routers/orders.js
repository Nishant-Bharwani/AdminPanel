const express = require('express');
const router = new express.Router();

router.get('/', async(req, res) => {
    res.status(200);
    res.redirect('/admin');
});

module.exports = router;