const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const shopController = require('../controllers/shop');

const router = express.Router();
const adminData = require('./admin');

router.get('/', shopController.getIndex);

router.get('/products/:productID', shopController.getProductDetails);

router.get('/products', shopController.getProduct);

router.get('/cart', shopController.getCart); 

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);
 
module.exports = router;

