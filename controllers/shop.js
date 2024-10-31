const Product = require("../models/products");
// const { products } = require("../routes/admin");
const Cart = require("../models/cart");



exports.getProduct = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render("shop/product-list", { prods: products, pageTitle: "All Products", path: "/products" });
    });
};

exports.getProductDetails = (req, res, next) => {
    const prodID = req.params.productID;
    Product.findById(prodID, product => {
        res.render("shop/product-detail", { product: product, pageTitle: product.title, path: "/products" });
    });
    
};
exports.getOrders = (req,res,next) => {
    res.render('shop/orders', {pageTitle: 'Your Orders', path: '/orders'});
}

exports.errors = (req,res,next)=> {
    res.status(404).render('404',{pageTitle: 'Page Not Found', path: ''});
}

exports.getIndex = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'});
    });
}

exports.getCart = (req,res,next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart', products: cartProducts});
        });
    });
   
}

exports.postCart = (req, res, next) => {
    const prodID = req.body.productID;
    Product.findById(prodID, product => {
        if (!product) {
            console.log('Product not found');
            return res.redirect('/products'); // Redirect or handle as appropriate
        }
        Cart.addProduct(prodID, product.price);
        res.redirect('/cart');
    });
};


exports.postCartDeleteProduct = (req, res, next) => {
    const prodID = req.body.productID;
    Product.findById(prodID, product => {
        if (!product) {
            return res.redirect('/cart');
        }
        Cart.deleteProduct(prodID, product.price);
        res.redirect('/cart');
    });
};


exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'});
}

