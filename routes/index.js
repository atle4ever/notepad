var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var log4js = require('log4js');
var logger = log4js.getLogger();

/* GET list */
router.get('/', function(req, res, next) {
    var files = fs.readdirSync('data');
    res.render('list', { 'items': files  });
});

/* GET input page */
router.get('/new', function(req, res, next) {
    res.render('new', { });
});

/* POST save new item */
router.post('/save_new_item', function(req, res, next) {
    var json_str = JSON.stringify(req.body);
    fs.writeFile(path.join('data', req.body.date), json_str);
    logger.info("new item is saved as " + req.body.date);

    res.redirect('/');
});

/* GET view item */
router.get('/view', function(req, res, next) {
    var date = req.query.date;
    var json_str = fs.readFileSync(path.join('data', date));
    var json = JSON.parse(json_str);
    console.log(json);
    
    res.render('view', json);
});

module.exports = router;
