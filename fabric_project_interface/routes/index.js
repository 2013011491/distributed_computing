var express = require('express');
var enroll = require('../fabric_js/enrollAdmin.js')
var register = require('../fabric_js/registerUser.js')
var query = require('../fabric_js/query.js')
var invoke = require('../fabric_js/invoke.js')
var router = express.Router();

let name;

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.render('index', { name: req.cookies.user });
});

router.get('/enrollAdmin', function(req, res, next) {
	enroll.enrollAdmin();
		res.redirect('/');
})

router.post('/registerUser', function(req, res, next) {
	user = req.body.user;
	console.log(user);
	register.registerUser(user);
	res.cookie('user', user);
	res.redirect('/');
})


module.exports = router;
