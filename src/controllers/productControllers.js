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
			product.image_product = JSON.parse(product.image_product);

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
		let searchResults = null;

		try {
			const categoryResults = async (category) => {
				const products = await Product.findAll();
				products.forEach((product) => {
					product.image_product = JSON.parse(product.image_product);
				});
				const productsFiltered = products.filter((x) => {
					if (x.productName && typeof x.productName === 'string') {
						return x.productName.toLowerCase() === category.toLowerCase();
					}
					return false;
				});
				return productsFiltered;
			};

			const valueCheck = (object, value) => {
				const valueArray = Object.values(object);
				const regex = new RegExp(value, 'i');
				for (let i = 0; i < valueArray.length; i++) {
					if (typeof valueArray[i] === 'string' && regex.test(valueArray[i])) {
						return true;
					}
				}
				return false;
			};

			const queryResults = async (query) => {
				const products = await Product.findAll();
				products.forEach((product) => {
					product.image_product = JSON.parse(product.image_product);
				});
				const productsFiltered = products.filter((x) => valueCheck(x, query));
				return productsFiltered;
			};

			if (!req.params.category) {
				searchResults = await queryResults(req.query.searchinfo);
			} else {
				searchResults = await categoryResults(req.params.category);
			}

			console.log(searchResults);

			res.render('searchResults', {
				searchResults,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	// @POST /products

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

		// cantidad de imgs que cargo el usuario
		const numUserImages = filenames.length;

		try {
			//busca el producto
			const existingProduct = await Product.findOne({
				where: {
					id_product: req.params.id,
				},
			});

			if (existingProduct) {
				const existingImages = JSON.parse(existingProduct.image_product);
				const maxImagesToKeep = 4; // maximo 4 imagenes por producto

				// cuantas imgs se mantienen y cuantas se actualizan
				const numImagesToKeep = Math.max(0, maxImagesToKeep - numUserImages);
				const imagesToKeep = existingImages.slice(-numImagesToKeep);
				const imagesToUpdate = filenames.slice(0, maxImagesToKeep);

				const updatedImages = imagesToKeep.concat(imagesToUpdate);
				const updatedProduct = {
					name_product: req.body.productName,
					colour_id: req.body.productColor,
					size_id: req.body.productSize,
					price_product: req.body.productPrice,
					quantity_product: req.body.productStock,
					description_product: req.body.productDescription,
					image_product: JSON.stringify(updatedImages),
				};

				await Product.update(updatedProduct, {
					where: {
						id_product: req.params.id,
					},
				});

				// Redirige al producto actualizado
				res.redirect('/products/' + req.params.id + '/details');
			}
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

	createColour: async (req, res) => {
		try {
			const colours = await Colour.findAll({ raw: true });

			res.render('createColour', {
				colours,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	createdColour: async (req, res) => {
		const newColour = {
			colour: req.body.productColor,
		};

		try {
			const createdColour = await Colour.create(newColour);

			console.log(createdColour);

			res.redirect('/products/colours');
		} catch (error) {
			console.log(error);
		}
	},

	createSize: async (req, res) => {
		try {
			const sizes = await Size.findAll({ raw: true });

			res.render('createSize', {
				sizes,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	createdSize: async (req, res) => {
		const newSize = {
			size: req.body.productSize,
		};

		try {
			const createdSize = await Size.create(newSize);

			console.log(createdSize);

			res.redirect('/products/sizes');
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = controller;
