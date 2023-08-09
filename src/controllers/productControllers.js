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
        const id = Number(req.params.id);
        const nuevosDatos = req.body;

        productModel.updateById(id, nuevosDatos);

        res.redirect('/');
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

        res.redirect('/product/' + createdProduct.id);
	}

}

module.exports = controller