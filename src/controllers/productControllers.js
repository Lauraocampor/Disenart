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
    editProduct:  (req,res) => {
        res.render('editProduct');
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


    res.redirect('/products/' + updatedProduct.id + '/detail');
    },
    store: (req, res) => {

        const filenames = req.files.map(file => file.filename);

        let newProduct = {
            productName: req.body.productName,
            productColor: req.body.productColor,
            productSize: req.body.productSize,
            productPrice: req.body.productPrice,
            productDescription: req.body.productDescription,
            productStock: req.body.productStock,
            productImages: filenames,
        }

        const createdProduct = productModel.createProduct(newProduct);

        res.redirect('/products/' + createdProduct.id);
    }
}

module.exports = controller