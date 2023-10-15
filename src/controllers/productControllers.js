const fs = require('fs');
const path = require('path');

const productModel = require('../models/productModel'); // sacar despues de hacer todo
const { Product, Colour, Size } = require('../database/models');

const controller = {
	details: async (req, res) => {
		try {
			const product = await Product.findByPk(req.params.id, {
				raw: true,
				include: ['size', 'colour'],
				nest: true,
			});
			console.log(product);
			res.render('createdProductDetail', {
				product,
				user: req.session.userLogged,
			});

			//quedo la vista cargada con imagenes random para ver que funciona
		} catch (error) {
			console.log(error);
		}
	},

	cart: (req, res) => {
		res.render('cart', { user: req.session.userLogged });
	},

	createProduct: async (req, res) => {
		//get

		try {
			const sizes = await Size.findAll({ raw: true });
			const colours = await Colour.findAll({ raw: true });
			console.log(colours);
			res.render('createProduct', {
				sizes,
				colours,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	editProduct: async (req, res) => {
		try {
			const product = await Product.findByPk(req.params.id, {
				raw: true,
				include: ['size', 'colour'],
				nest: true,
			});
			const colours = await Colour.findAll();
			const sizes = await Size.findAll();

			res.render('editProduct', {
				product,
				colours,
				sizes,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	userProduct: async (req, res) => {
		try {
			const product = await Product.findByPk(req.params.id, {
				raw: true,
				include: ['size', 'colour'],
				nest: true,
			});
			res.render('details', { product, user: req.session.userLogged });
		} catch (error) {
			console.log(error);
		}
	},

	searchResults: async (req, res) => {
		if (!req.params.category) {
			searchResults = productModel.queryResults(req.query.searchinfo);
		} else {
			searchResults = productModel.categoryResults(req.params.category);
		}
		res.render('searchResults', {
			searchResults,
			user: req.session.userLogged,
		});
	},

	// @GET /products

	store: async (req, res) => {
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

		const newProduct = {
			name_product: req.body.productName,
			colour_id: req.body.productColor,
			size_id: req.body.productSize,
			price_product: req.body.productPrice,
			quantity_product: req.body.productStock,
			description_product: req.body.productDescription,
			image_product: JSON.stringify(filenames),
		};

		try {
			const createdProduct = await Product.create(newProduct);

			res.redirect('/products/' + createdProduct.dataValues.id);
		} catch (error) {
			console.log(error);
		}
	},

	updateProduct: async (req, res) => {
		const filenames = req.files.map((file) => file.filename);

		let updatedProduct = {
			id: Number(req.params.id),
		};

		updatedProduct = {
			...updatedProduct,
			name_product: req.body.productName,
			colour_id: req.body.productColor,
			size_id: req.body.productSize,
			price_product: req.body.productPrice,
			quantity_product: req.body.productStock,
			description_product: req.body.productDescription,
			image_product: [filenames],
		};

		try {
			await Product.update(updatedProduct, {
				where: {
					id: req.params.id,
				},
			});
		} catch (error) {
			console.log(error);
		}

		/* 
       const updatedProduct = req.body;
       updatedProduct.id = Number(req.params.id); 
   */

		productModel.updateProduct(updatedProduct);

		//chequear este redirect cuando quede listo el listado de productos
		res.redirect('/products/' + updatedProduct.id);
	},

	deleteProduct: async (req, res) => {
		const id = req.params.id;
		try {
			await Product.destroy({
				where: {
					id,
				},
			});
		} catch (error) {
			console.log(error);
		}

		//chequear este redirect cuando quede listo el listado de productos
		res.redirect('/products//searching/searchResults');
	},
};

module.exports = controller;
