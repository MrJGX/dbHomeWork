/**
 * Created by ASUS on 2017/7/13.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.render('login');
});

module.exports = router;
