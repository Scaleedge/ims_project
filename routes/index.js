var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
// const storeController = require("../controllers/storeController")
const db = require("../models");
const storeProductMapping  = require('../controllers/storeProductMappingController');
// const Store = db.store

// Login User Api

router.get('/', function(req, res) {
  
  res.render('login', { title: 'Express', message: req.flash('message') });

});

router.post("/login", userController.loginUser);

// logout Api

router.get('/logout', function(req, res) {
  req.session.isLoggedIn = false
  req.flash('message', 'You are Sucessfully Logout.');
  res.redirect('/');
});


// Register User Api

router.get('/register', function(req, res) {
  res.render('register', { title: 'Express' });
});

router.post("/register", userController.registerUser);


let checkUser = (req, res, next) => {
  if( req.session.isLoggedIn) {
    next()
  } else {
    req.flash('message', 'Plz login first');
    res.redirect('/')
  }
}

// Dashboard Api

router.get('/dashboard', checkUser, function(req, res) {
  res.render('dashboard', { title: 'Express', message: req.flash('message') });
});


// Product Api

router.get('/product', async function(req, res) {
  // const store = await Store.findAll()
  // console.log(store)
  res.render('product', { title: 'Express' });
});

router.post('/createProduct', productController.createProduct )

// product raise Api 

router.get('/productraise', function(req, res) {
  res.render('productraise', { title: 'Express' , message: req.flash('message')});
});

router.post('/productraise' , storeProductMapping.addStoreProductMapping)


// router.post("/createStore", storeController.createStore);

module.exports = router;
