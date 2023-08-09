const fs = require('fs');
const path = require('path');


const productModel = require('../models/productModel');

const controller ={
    details: (req,res) => {
        res.render('details');
    },
    cart: (req,res) => {
        res.render('cart');
    },
    createProduct:  (req,res) => {
        res.render('createProduct');
    },
    editProduct:(req, res) => {
        const product = productModel.findById(Number(req.params.id));

        res.render('editProduct', { product });
    },

 // @GET /products 

 updateProduct: (req, res) => {
    let updatedProduct = {
        id: Number(req.params.id)
    };

    updatedProduct = {
        ...updatedProduct,
        ...req.body
    };

    /* 
        const updatedProduct = req.body;
        updatedProduct.id = Number(req.params.id); 
    */

    productModel.updateProduct(updatedProduct);

    res.redirect('/products/details')
    
    
      /* ' + updatedProduct.id + 
     
        detail');    */
}
}

module.exports = controller