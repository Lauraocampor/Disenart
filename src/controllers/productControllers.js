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
    },

updateProduct: (req, res) => {

    const filenames= req.files.map(file=>file.filename);
   let updatedProduct = {
       id: Number(req.params.id)
   };

   updatedProduct = {
       ...updatedProduct,
       ...req.body,
       productImages: filenames,
   };

   /* 
       const updatedProduct = req.body;
       updatedProduct.id = Number(req.params.id); 
   */

   productModel.updateProduct(updatedProduct);


   res.redirect('/products/details')
   
   
     /* ' + updatedProduct.id + 
    
       detail');    */
   },
}

module.exports = controller