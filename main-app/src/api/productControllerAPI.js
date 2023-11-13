const DB = require('../database/models');
const Product = DB.Product;

const controller = {
	// MAIN UTILITIES
	categoryCount: (category, info) => {
		const response = info.filter((item) =>
			item.name_product.toLowerCase().includes(category.toLowerCase()),
		);
		return response.length;
	},
	resultFormatter: (info) => {
		// MAIN LOOP
		for (let index = 0; index < info.length; index++) {
			// CLEANING INFO
			info[index] = info[index].dataValues;
			delete info[index]['colour_id'];
			delete info[index]['size_id'];
			delete info[index]['price_product'];
			delete info[index]['quantity_product'];
			delete info[index]['image_product'];
			// ASSINGING CATEGORY
			const categories = ['remera', 'buzo', 'termno', 'taza', 'gorra', 'mate'];
			for (let x = 0; x < categories.length; x++) {
				if (info[index]['name_product'].toLowerCase().includes(categories[x])) {
					info[index]['relations'] = [categories[x]];
				}
			}
			// URL ADDITION
			info[index]['details_url'] = `http://localhost:${
				process.env.PORT || 3000
			}/products/${info[index]['id_product']}/details`;
		}
		// ENDING
		return info;
	},
	productImage: (product) => {
		return `http://localhost:${process.env.PORT || 3000}/images/productos/${
			JSON.parse(product['image_product'])[0]
		}`;
	},
	// MAIN METHODS
	all: async (req, res) => {
		try {
			const inventory = await Product.findAll();
			const data = {
				count: inventory.length,
				countByCategory: {
					remera: controller.categoryCount('remera', inventory),
					buzo: controller.categoryCount('buzo', inventory),
					termo: controller.categoryCount('termo', inventory),
					taza: controller.categoryCount('taza', inventory),
					gorra: controller.categoryCount('gorra', inventory),
					mate: controller.categoryCount('mate', inventory),
				},
				products: controller.resultFormatter(inventory),
			};
			res.json(data);
		} catch (error) {
			res.json(error);
		}
	},
	getById: async (req, res) => {
		try {
			// PRODUCT GETTER
			let product = await Product.findByPk(req.params.id);
			//VERIFIER
			if (product === null) {
				throw new Error('No product has been found!');
			} else {
				product = product.dataValues;
				// IMG URL CREATION
				product['img_url'] = controller.productImage(product);
				// RELATIONS
				product['relations'] = ['colour', 'size'];
				// SUCCESSFUL RESPONSE
				res.json(product);
			}
		} catch (error) {
			// ERR STATEMENT
			res.status(404).json({
				error: error.message,
			});
		}
	},
};

module.exports = controller;
