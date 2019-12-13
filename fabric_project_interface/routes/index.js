var express = require('express');
var enroll = require('../fabric_js/enrollAdmin.js')
var register = require('../fabric_js/registerUser.js')
var query = require('../fabric_js/query.js')
var invoke = require('../fabric_js/invoke.js')
var router = express.Router();

let user;
var myCars;
var carsOnSale;
var registeredCars;

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('main page')
 	res.render('index', { name: req.cookies.user, myCars:myCars, registeredCars:registeredCars,
			carsOnSale:carsOnSale});
});

router.get('/enrollAdmin', async function(req, res, next) {
	await enroll.enrollAdmin();
	res.redirect('/');
})

router.post('/registerUser', async function(req, res, next) {
	user = req.body.user;
	console.log(user);
	await register.registerUser(user);
	res.cookie('user', user);
	res.redirect('/');
})

router.post('/registerCar', async function(req, res, next) {
 	console.log('name : ', user);
 	var result = await invoke.invoke(req.cookies.user,"registerCar",[req.body.make,req.body.model,req.body.color,req.cookies.user]);
	var multi = await query.query(req.cookies.user);
	myCars = multi[0];
	registeredCars = multi[1];
	carsOnSale = multi[2];
	console.log(myCars);
	res.render('index',{name:req.cookies.user,myCars:myCars, registeredCars:registeredCars, 
			carsOnSale:carsOnSale});
})

router.post('/sellMyCar', async function(req, res, next) {
 	console.log('name : ', user);
 	var result = await invoke.invoke(req.cookies.user,"sellMyCar",req.body['demo-category']);
	var multi = await query.query(req.cookies.user);
	carsOnSale = multi[2];
	res.render('index',{name:req.cookies.user,myCars:myCars,registeredCars:registeredCars, 
			carsOnSale:carsOnSale});
})

router.post('/buyUserCar', async function(req, res, next) {
 	console.log('name : ', user);
 	var result = await invoke.invoke(req.cookies.user,"buyUserCar",[req.body['demo-category'],req.cookies.user]);
	var multi = await query.query(req.cookies.user);
	myCars = multi[0];
	registeredCars = multi[1];
	carsOnSale = multi[2];
	res.render('index',{name:req.cookies.user,myCars:myCars, registeredCars:registeredCars, 
			carsOnSale:carsOnSale});
})

// example, how to use json object in router
// router.post('/query', async function(req, res, next) {
// 	console.log('name : ', user)
// 	var result = await query.query(req.cookies.user)
// 	console.log('result : ', result)
// 	console.log('make : ', result['make'])

// 	res.redirect('/');
// })


module.exports = router;
