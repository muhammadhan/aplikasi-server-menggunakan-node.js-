var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
let arr = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/filestream', function (req, res, next) {
  let fd = 'sources/datautsap3.txt';
  fs.readFile(fd, "utf-8", (err, data) => {
    let row = data.split('\n');
    row.forEach((el, index) => {
      let column = el.split('|');
      arr.push(column);
    });
    res.render('filestream', {
      data: arr
    });
  });
});

router.get('/filestream/search', function (req, res, next) {
  let result = [];
  if (arr == null) {

  } else {
    arr.forEach(el => {
      if (el[5] == req.query.keyword) {
        result.push(el);
      }
    });
    res.render('filestream', {
      data: result
    });
  }
});

module.exports = router;