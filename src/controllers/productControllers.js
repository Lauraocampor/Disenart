const fs = require('fs');
const path = require('path');

const productModel = require('../models/productModel');
const { Product, Colour, Size } = require('../database/models');

const controller = {
	details: async (req, res) => {
		try {
			const selectedProduct = await Product.findByPk(req.params.id, {
				raw: true,
			});
			res.render('createdProductDetail', selectedProduct, {
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
		//const productiId = req.params.id;
		//const selectedProduct = productModel.findById(productiId);
	},

	cart: (req, res) => {
		res.render('cart', { user: req.session.userToLogged });
	},
	createProduct: (req, res) => {
		res.render('createProduct', { user: req.session.userToLogged });
	},
	editProduct: (req, res) => {
		const product = productModel.findById(Number(req.params.id));

		res.render('editProduct', { product, user: req.session.userToLogged });
	},
	userProduct: (req, res) => {
		const product = productModel.findById(Number(req.params.id));

		res.render('details', { product, user: req.session.userToLogged });
	},
	searchResults: function (req, res) {
		if (!req.params.category) {
			searchResults = productModel.queryResults(req.query.searchinfo);
		} else {
			searchResults = productModel.categoryResults(req.params.category);
		}
		res.render('searchResults', {
			searchResults,
			user: req.session.userToLogged,
		});
	},

	// @GET /products

	store: (req, res) => {
		const filenames = req.files.map((file) => file.filename);
		let imagenDefault = 'imagen-no-disponible.jpg';

		if (filenames[3]) {
			// Si el usuario selecciona 4 imágenes, no se hace nada especial
		} else if (filenames[2]) {
			// Si no se seleccionan todas las imágenes, establecer el nombre de archivo por defecto
			filenames.push(imagenDefault);
		} else if (filenames[1]) {
			filenames.push(imagenDefault);
			filenames.push(imagenDefault);
		} else if (filenames[0]) {
			filenames.push(imagenDefault);
			filenames.push(imagenDefault);
			filenames.push(imagenDefault);
		} else {
			filenames.push(imagenDefault);
			filenames.push(imagenDefault);
			filenames.push(imagenDefault);
			filenames.push(imagenDefault);
		}

		let newProduct = {
			productName: req.body.productName,
			productColor: req.body.productColor,
			productSize: req.body.productSize,
			productPrice: req.body.productPrice,
			productDescription: req.body.productDescription,
			productStock: req.body.productStock,
			productImages: filenames,
		};

		const createdProduct = productModel.createProduct(newProduct);

		res.redirect('/products/' + createdProduct.id);
	},

	updateProduct: (req, res) => {
		const filenames = req.files.map((file) => file.filename);
		let updatedProduct = {
			id: Number(req.params.id),
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

		//chequear este redirect cuando quede listo el listado de productos
		res.redirect('/products/' + updatedProduct.id);
	},

	deleteProduct: (req, res) => {
		productModel.delete(Number(req.params.id));

		//chequear este redirect cuando quede listo el listado de productos
		res.redirect('/products//searching/searchResults');
	},
};

module.exports = controller;
