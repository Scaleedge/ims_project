var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const storeController = require("../controllers/storeController")
const productStockController = require('../controllers/productStockController')
const stockInOutController = require("../controllers/stockInOutController")
const productRaise  = require('../controllers/productRaiseController');
const db = require("../models");
const Store = db.store
const Product = db.products
var multer = require('multer');
const upload = multer( { dest: 'public/' } )

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
    req.flash('message', 'Please login first');
    res.redirect('/')
  }
}

// Dashboard Api

router.get('/dashboard', checkUser, function(req, res) {
  res.render('dashboard', { title: 'Express', message: req.flash('message') });
});


// Product Api

router.get('/product', checkUser, function(req, res) {
  // const store = await Store.findAll()
  // console.log(store)
  res.render('product', { title: 'Express', message: req.flash('message') });
});

router.post('/createProduct', upload.single('imageUrl'), productController.createProduct )


// Product Stock Api

router.post('/addProductStock',productStockController.addProductStock)

// store master api

router.get('/storeMaster', checkUser, function(req, res) {
  res.render('storeMaster', { title: 'Express' , message: req.flash('message')});
});

router.post("/createStore", storeController.createStore);


// product raise Api 

router.get('/productRaise', checkUser, async function(req, res) {
  const store = await Store.findAll()

  const product = await Product.findAll()
  console.log(product,store)

  res.render('productRaise', { title: 'Express' , message: req.flash('message'),store,product});
});

router.post('/productRaise' , productRaise.addProductRaise)



// stock In/Out api

router.get('/stockInOut', checkUser, async function(req, res) {
  const store = await Store.findAll()
  const product = await Product.findAll()
  // console.log(product,store)  
  res.render('stockInOut', { title: 'Express' , message: req.flash('message'), store , product});
});

router.post('/stockInOut', stockInOutController.stockInOut)



module.exports = router;