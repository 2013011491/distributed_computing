var express = require('express');
var enroll = require('../fabric_js/enrollAdmin.js')
var register = require('../fabric_js/registerUser.js')
var query = require('../fabric_js/query.js')
var invoke = require('../fabric_js/invoke.js')
var router = express.Router();

let name;

var registeredCars;
var carsOnSale;
var myCars;
var mycars_category;
var sale_category;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { name: req.cookies.user });
});

router.get('/registerCar', function(req, res, next) {
	console.log(1);
	/*invoke.invoke(name,"registerCar",["registerCar",req.body.make,req.body.model,req.body.color,name]);
	registeredCars=query.query("getAllRegisteredCar");
	myCars=query.query("getMyCar");
	console.log(myCars);*/	
	
	res.setTimeout(1000,function() {
		res.render('index', { name: req.cookies.user });
	});
});

router.get('/sellMyCar', function(req, res, next) {
	invoke.invoke(name,"sellMyCar",["sellMyCar",req.body.mycars-category,req.body.price]);
	res.render('index', { name: req.cookies.user });
});

router.get('/buyCar', function(req, res, next) {
	invoke.invoke(name,"buyUserCar",["buyUserCar",req.body.sale-category,name]);
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
