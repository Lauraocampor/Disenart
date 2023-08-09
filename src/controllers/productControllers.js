const path = require('path');

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
}

}

module.exports = controller