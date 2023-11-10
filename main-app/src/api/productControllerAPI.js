// METHOD ALL
// Deberá devolver un objeto literal con la siguiente estructura:
//  count → cantidad total de productos en la base.
//  countByCategory → objeto literal con una propiedad por categoría con el total de productos.
//  products → array con la colección de productos, cada uno con:
//  id
//  name
//  description
//  un array con principal relación de uno a muchos (ej:categories).
//  detail → URL para obtener el detalle.
const DB = require('../database/models');
const Product = DB.Product;

const controller = {
	all: async (req, res) => {
		try {
			const inventory = await Product.findAll();
			console.log(inventory);
			res.json(inventory);
		} catch (error) {
			console.log(error);
		}
	},
	getById: (req, res) => {
		res.json({ status: 200 });
	},
};

module.exports = controller;
