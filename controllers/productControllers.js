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

}

module.exports = controller