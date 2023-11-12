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
			info[index][
				'details_url'
			] = `http://localhost:${(process.env.PORT || 3000)}/products/${info[index]['id_product']}/details`;
		}
		// ENDING
		return info;
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
			console.log(error);
		}
	},
	getById: (req, res) => {
		res.json({ status: 200 });
	},
};

module.exports = controller;
