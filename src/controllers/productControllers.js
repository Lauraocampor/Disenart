const fs = require('fs');
const path = require('path');

//const productModel = require('../models/productModel'); // sacar despues de hacer todo
const { Product, Colour, Size } = require('../database/models');

const controller = {
	details: async (req, res) => {
		try {
			const product = await Product.findByPk(req.params.id, {
				raw: true,
				include: ['size', 'colour'],
				nest: true,
			});

			product.image_product = JSON.parse(product.image_product);
			console.log(product);
			res.render('createdProductDetail', {
				product,
				user: req.session.userLogged,
			});
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

			product.image_product = JSON.parse(product.image_product);
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

		// Verificar cuántas imágenes cargo el usuario
		const numUserImages = filenames.length;

		// calcular cuantas se deben agregar x default
		const numDefaultImagesToAdd = 4 - numUserImages;

		// se agregan las imagenes faltantes correspondientes
		for (let i = 0; i < numDefaultImagesToAdd; i++) {
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

			const productId = createdProduct.get('id_product');

			res.redirect('/products/' + productId + '/details');
		} catch (error) {
			console.log(error);
		}
	},

	updateProduct: async (req, res) => {
		const filenames = req.files.map((file) => file.filename);
		let imagenDefault = 'imagen-no-disponible.jpg';

		// verifica cuantas imágenes cargo el usuario
		const numUserImages = filenames.length;

		// calcula cuantas se deben agregar x default
		const numDefaultImagesToAdd = 4 - numUserImages;

		// se agregan las imagenes faltantes correspondientes
		for (let i = 0; i < numDefaultImagesToAdd; i++) {
			filenames.push(imagenDefault);
		}

		const updatedProduct = {
			name_product: req.body.productName,
			colour_id: req.body.productColor,
			size_id: req.body.productSize,
			price_product: req.body.productPrice,
			quantity_product: req.body.productStock,
			description_product: req.body.productDescription,
			image_product: JSON.stringify(filenames),
		};

		try {
			await Product.update(updatedProduct, {
				where: {
					id_product: req.params.id,
				},
			});

			// redirect al producto actualizado
			res.redirect('/products/' + req.params.id + '/details');
		} catch (error) {
			console.log(error);
		}
	},

	deleteProduct: async (req, res) => {
		const id = req.params.id;
		try {
			await Product.destroy({
				where: {
					id_product: id,
				},
			});
		} catch (error) {
			console.log(error);
		}

		//CAMBIAR ESTE REDIRECT CUANDO ESTE OK EL LISTADO DE PRODUCTOS
		res.redirect('/products/1/details');
	},
};

module.exports = controller;
