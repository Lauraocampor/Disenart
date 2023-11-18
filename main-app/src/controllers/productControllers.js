//const productModel = require('../models/productModel'); // sacar despues de hacer todo
const { Product, Colour, Size } = require('../database/models');
const { validationResult } = require ("express-validator")

const controller = {

	//@GET /searching/searchResults/:category?
	searchResults: async (req, res) => {
		try {
			// CATEGORY SEARCH
			const categoryResults = async (category) => {
				// category normalization
				category = category.toLowerCase();
				// product list invocation and image name organizing
				const products = await Product.findAll();
				products.forEach((product) => {
					product.image_product = JSON.parse(product.image_product);
				});
				// product list selection
				let productsFiltered = products.filter((product) => {
					let searchTerm = product.dataValues.name_product.toLowerCase(); // db name normalization
					return searchTerm.includes(category);
				});
				// response formatting
				for (let index = 0; index < productsFiltered.length; index++) {
					productsFiltered[index] = productsFiltered[index].dataValues;
				}
				// ending
				return productsFiltered;
			};
			// QUERY SEARCH
			const queryResults = async (query) => {
				// product list invocation and image name organizing
				const products = await Product.findAll();
				products.forEach((product) => {
					product.image_product = JSON.parse(product.image_product);
				});
				// product list formatting
				for (let index = 0; index < products.length; index++) {
					products[index] = products[index].dataValues;
				}
				// value regex
				const valueCheck = (product, query) => {
					const regex = new RegExp(query, 'i');
					return (
						product.name_product.match(regex) ||
						product.description_product.match(regex)
					);
				};
				// product filtering
				const productsFiltered = products.filter((product) =>
					valueCheck(product, query),
				);
				// ending
				return productsFiltered;
			};
			// VALUE CREATOR
			let searchResults = [];
			req.params.category
				? (searchResults = await categoryResults(req.params.category))
				: (searchResults = await queryResults(req.query.searchinfo));
			// RENDERER
			res.render('searchResults', {
				searchResults,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	// @GET - products/:id/customer
	customerProduct: async (req, res) => {
		try {
			const product = await Product.findByPk(req.params.id, {
				raw: true,
				include: ['size', 'colour'],
				nest: true,
			});
	
			product.image_product = JSON.parse(product.image_product);
	
			res.render('details', { product });
		} catch (error) {
			console.log(error);
		}
	},

	//@GET products/:id/details
	details: async (req, res) => {
		try {
			const product = await Product.findByPk(req.params.id, {
				raw: true,
				include: ['size', 'colour'],
				nest: true,
			});

			product.image_product = JSON.parse(product.image_product);
			//console.log(product);
			res.render('createdProductDetail', {
				product,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	//@GET /products/cart
	cart: (req, res) => {
		res.render('cart', { user: req.session.userLogged });
	},

	//@GET /products/createProduct
	createProduct: async (req, res) => {
	

		try {
			const sizes = await Size.findAll({ raw: true });
			const colours = await Colour.findAll({ raw: true });
			//console.log(colours);
			res.render('createProduct', {
				sizes,
				colours,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	// @GET - /products/:id/edit
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
				oldData: req.body,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	// @GET /products/searching/searchResultsUser/:category?
	searchResultsUser: async (req, res) => {
		try {
			// CATEGORY SEARCH
			const categoryResults = async (category) => {
				// category normalization
				category = category.toLowerCase();
				// product list invocation and image name organizing
				const products = await Product.findAll();
				products.forEach((product) => {
					product.image_product = JSON.parse(product.image_product);
				});
				// product list selection
				let productsFiltered = products.filter((product) => {
					let searchTerm = product.dataValues.name_product.toLowerCase(); // db name normalization
					return searchTerm.includes(category);
				});
				// response formatting
				for (let index = 0; index < productsFiltered.length; index++) {
					productsFiltered[index] = productsFiltered[index].dataValues;
				}
				// ending
				return productsFiltered;
			};
			// QUERY SEARCH
			const queryResults = async (query) => {
				// product list invocation and image name organizing
				const products = await Product.findAll();
				products.forEach((product) => {
					product.image_product = JSON.parse(product.image_product);
				});
				// product list formatting
				for (let index = 0; index < products.length; index++) {
					products[index] = products[index].dataValues;
				}
				// value regex
				const valueCheck = (product, query) => {
					const regex = new RegExp(query, 'i');
					return (
						product.name_product.match(regex) ||
						product.description_product.match(regex)
					);
				};
				// product filtering
				const productsFiltered = products.filter((product) =>
					valueCheck(product, query),
				);
				// ending
				return productsFiltered;
			};
			// VALUE CREATOR
			let searchResults = [];
			req.params.category
				? (searchResults = await categoryResults(req.params.category))
				: (searchResults = await queryResults(req.query.searchinfo));
				//console.log(searchResults);
			// RENDERER
			res.render('searchResultsUser', {
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

		const colour = req.body.productColor

		let colourInDb = await Colour.findOne({
			where: { colour: colour },
			raw: true,
		});

		let colourId = colourInDb.id_colour

		const size = req.body.productSize

		let sizeInDb = await Size.findOne({
			where: { size: size },
			raw: true,
		});

		//console.log(sizeInDb)

		let sizeId = sizeInDb.id_size



		const newProduct = {
			name_product: req.body.productName,
			colour_id: colourId,
			size_id: sizeId,
			price_product: req.body.productPrice,
			quantity_product: req.body.productStock,
			description_product: req.body.productDescription,
			image_product: JSON.stringify(filenames),
		};

		const resultValidation = validationResult(req);
		const sizes = await Size.findAll({ raw: true });
		const colours = await Colour.findAll({ raw: true });


		if (resultValidation.errors.length > 0) {
			return res.render('createProduct', {sizes,
				colours,
				errors: resultValidation.mapped(),
				oldData: req.body,
				user: req.session.userLogged,
			});
		}

		try {

			const createdProduct = await Product.create(newProduct);
			
			const productId = createdProduct.get('id_product');
			//console.log(newProduct)
			

			res.redirect('/products/' + productId + '/details');
		} catch (error) {
			console.log(error);
		}
	},

	// @PUT /products/:id/editProduct
	updateProduct: async (req, res) => {

		// busco el producto para poder volver a mandar la vista edit en caso de error
		const product = await Product.findByPk(req.params.id, {
			raw: true,
			include: ['size', 'colour'],
			nest: true,
		});

		// convierto en array la columna de imagenes para poder hacer el forEach en la vista
		product.image_product = JSON.parse(product.image_product);
		
		// busco los colores y talles para poder volver a mandar la vista edit en caso de error
		const sizes = await Size.findAll({ raw: true });
		const colours = await Colour.findAll({ raw: true });
	
		// hago las validaciones 
		const resultValidation = validationResult(req);


		if (resultValidation.errors.length > 0) {
			return res.render('editProduct', {product, 
				sizes,
				colours,
				errors: resultValidation.mapped(),
				oldData: req.body,
				user: req.session.userLogged,
			});
		}

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
					colour_id: Number(req.body.productColor),
					size_id: Number(req.body.productSize),
					price_product: (req.body.productPrice),
					quantity_product: req.body.productStock,
					description_product: req.body.productDescription,
					image_product: JSON.stringify(updatedImages),
				};

				await Product.update(updatedProduct, {
					where: {
						id_product: req.params.id,
					},
				});
				//console.log(updatedProduct)

				// Redirige al producto actualizado
				res.redirect('/products/' + req.params.id + '/details');
			}
		} catch (error) {
			console.log(error);
		}
	},

	//@DELETE - /products/:id/delete
	deleteProduct: async (req, res) => {
		const id = Number(req.params.id);
		try {
			await Product.destroy({
				where: {
					id_product: id,
				},
			});
		} catch (error) {
			console.log(error);
		}

		
		res.redirect('/products/searching/searchResultsUser');
	},

	// @GET /products/color
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

	// @POST  /products/color
	createdColour: async (req, res) => {
		const newColour = {
			colour: req.body.productColor,
		};

		try {
			// eslint-disable-next-line no-unused-vars
			const createdColour = await Colour.create(newColour);

			// console.log(createdColour);

			res.redirect('/products/colours');
		} catch (error) {
			console.log(error);
		}
	},

	// @GET  /products/size
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

	//  @POST /products/size
	createdSize: async (req, res) => {
		
		const newSize = {
			size: req.body.productSize,
		};

		try {
			// eslint-disable-next-line no-unused-vars
			const createdSize = await Size.create(newSize);

			// console.log(createdSize);

			res.redirect('/products/sizes');
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = controller;
