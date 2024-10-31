const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const { title } = require('process');

const router = express.Router();
const adminController = require('../controllers/admin');

const products = [];

router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProduct); 

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/add-product', adminController.postAddProduct); 

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

exports.routes = router;
exports.products = products;