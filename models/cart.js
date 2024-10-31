const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
   static addProduct(id, ProductPrice) {
       // Fetch the previous cart
       fs.readFile(p, (err, fileContent) => {
          let cart = {products: [], totalPrice: 0};
          if(!err) {
             cart = JSON.parse(fileContent);
          }

            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + ProductPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
       })
       
   }

   static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log("Cart file not found.");
            return;
        }
        const updatedCart = { ...JSON.parse(fileContent) };
        const product = updatedCart.products.find(prod => prod.id === id);
        if (!product) {
            console.log("Product not found in cart.");
            return;
        }
        const productQty = product.qty;
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
        updatedCart.totalPrice -= productPrice * productQty;

        fs.writeFile(p, JSON.stringify(updatedCart), err => {
            if (err) console.log(err);
        });
    });
}


static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb({ products: [], totalPrice: 0 });
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}


}