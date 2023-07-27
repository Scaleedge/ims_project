let express = require('express');
let router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const storeController = require("../controllers/storeController")
const productStockController = require('../controllers/productStockController')
const stockInOutController = require("../controllers/stockInOutController")
const manufacturerController = require("../controllers/manufacturerController")
const categoryController = require("../controllers/categoryMasterController")
const productRaise = require('../controllers/productRaiseController');
const productCategoryMapping = require('../controllers/productCategoryMappingController')
const checkUser = require("../middleware/checkUser")
const db = require("../models");
const Store = db.store
const Product = db.products
const Manufacturer = db.manufacturer
const Category = db.category
let multer = require('multer');
const database = require('../config/database');
const upload = multer({ dest: 'public/' })



// Login User Api

router.get('/', function (req, res) {

  res.render('login', { title: 'Express', message: req.flash('message') });

});

router.post("/login", userController.loginUser);




// logout Api

router.get('/logout', function (req, res) {
  req.session.isLoggedIn = false
  req.flash('message', 'You are Sucessfully Logout.');
  res.redirect('/');
});




// Register User Api

router.get('/register', function (req, res) {
  res.render('register', { title: 'Express' });
});

router.post("/register", userController.registerUser);





// Dashboard Api

router.get('/dashboard', checkUser, function (req, res) {
  res.render('dashboard', { title: 'Express', message: req.flash('message') });
});


// Product Listing Api

router.get('/getAllProduct', productController.getAllProduct);



// Create Product Api

router.get('/product', checkUser, async function (req, res) {
  const manufacturer = await Manufacturer.findAll()
  res.render('product', { title: 'Express', message: req.flash('message'), manufacturer });
});

router.get('/productList', checkUser, async function (req, res) {
  res.render('productList', { title: 'Express', message: req.flash('message')});
});

router.get('/productList', checkUser, async function (req, res) {
  
});

router.post('/createProduct', upload.single('imageUrl'), productController.createProduct)




// Product Stock Api

router.post('/addProductStock', productStockController.addProductStock)


// Product Category Mapping

router.post('/productCategoryMapping', productCategoryMapping.productCategoryMapping)




// store master api

router.get('/storeMaster', checkUser, function (req, res) {
  res.render('storeMaster', { title: 'Express', message: req.flash('message') });
});

router.post("/createStore", storeController.createStore);

// store list api

router.get('/storeList', checkUser, async function (req, res) {
  res.render('storeMasterList', { title: 'Express', message: req.flash('message') });   
})

router.get('/storemasterList',  async function (req, res) {

  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}


  if (req.query.search.value) {
    where[Op.or] = [
      { storeName: { [Op.like]: `%${req.query.search.value}%` } },
      { storeAddress: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const store = await Store.findAll({
    limit: length,
    offset: start,
    where: where
  })
  const count = await Store.count()

  let data_arr = []
  for (let i = 0; i < store.length; i++) {
    data_arr.push({
      'outletId': store[i].outletId,
      'storeName': store[i].storeName,
      'storeAddress': store[i].storeAddress
    });
  }
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };
  res.json(output)
})



// product raise Api 

router.get('/productRaise', checkUser, async function (req, res) {
  const store = await Store.findAll()

  const product = await Product.findAll()
  console.log(product, store)

  res.render('productRaise', { title: 'Express', message: req.flash('message'), store, product });
});

router.post('/productRaise', productRaise.addProductRaise)




// stock In/Out api

router.get('/stockInOut', checkUser, async function (req, res) {
  const store = await Store.findAll()
  const product = await Product.findAll()
  // console.log(product,store)  
  res.render('stockInOut', { title: 'Express', message: req.flash('message'), store, product });
});

router.post('/stockInOut', stockInOutController.stockInOut)



// Manufacturer  Master Api

router.get('/manufacturer', checkUser, function (req, res) {
  res.render('manufacturer', { title: 'Express', message: req.flash('message') });
});

router.get('/manufacturerList', checkUser, function (req, res) {
  res.render('manufacturerList', { title: 'Express', message: req.flash('message') });
});

router.get('/manufacturerMasterList',  async function (req, res) {

  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}


  if (req.query.search.value) {
    console.log(req.query.search)
    where[Op.or] = [
      { shortDescription: { [Op.like]: `%${req.query.search.value}%` } },
      { longDescription: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const manufacturer = await Manufacturer.findAll({
    limit: 2,
    offset: 0,
    where: where
  })
  console.log(manufacturer)
  const count = await Manufacturer.count()
  console.log(count)

  let data_arr = []
  for (let i = 0; i <manufacturer.length; i++) {
    data_arr.push({
      'id': manufacturer[i].id,
      'shortDescription': manufacturer[i].shortDescription,
      'longDescription': manufacturer[i].longDescription
    });
  }
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };

  res.json(output)
})

router.post('/addManufacturer', manufacturerController.addManufacturer)



// Category Master Api

router.get('/category', checkUser, function (req, res) {
  res.render('category', { title: 'Express', message: req.flash('message') });
});

router.get('/categoryList', checkUser, function (req, res) {
  res.render('categoryList', { title: 'Express', message: req.flash('message') });
});

router.get('/categoryMasterList',  async function (req, res) {
console.log(123)
  let draw = req.query.draw;

  let start = parseInt(req.query.start);

  let length = parseInt(req.query.length);

  let where = {}


  if (req.query.search.value) {
    console.log(req.query.search)
    where[Op.or] = [
      { shortDescription: { [Op.like]: `%${req.query.search.value}%` } },
      { longDescription: { [Op.like]: `%${req.query.search.value}%` } },
    ];
  }

  const category = await Category.findAll({
    limit: 2,
    offset: 0,
    where: where
  })
  console.log(category)
  const count = await Category.count()
  console.log(count)

  let data_arr = []
  for (let i = 0; i <category.length; i++) {
    data_arr.push({
      'id': category[i].id,
      'shortDescription': category[i].shortDescription,
      'longDescription': category[i].longDescription
    });
  }
  let output = {
    'draw': draw,
    'iTotalRecords': count,
    'iTotalDisplayRecords': count,
    'aaData': data_arr
  };

  res.json(output)
})

router.post('/addcategory', categoryController.addCategory)


module.exports = router;
