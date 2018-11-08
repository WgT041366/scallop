var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https') 
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/h5', function(req, res, next) {
  res.render('mobile', { title: 'Express' });
});
// 下载页
router.get('/downloads', function(req, res, next) {
  res.render('download', { title: 'Express' });
});


module.exports = router;
