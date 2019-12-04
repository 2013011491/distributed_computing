var express = require('express');
var router = express.Router();
var html ="";

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.setTimeout(1000,function(){
		res.render('index', {address : html });
	});
});

router.post('/',function(req, res, next) {
	html="";
	html += req.body.private_key;
	res.render('index', { address: html});
});



module.exports = router;
