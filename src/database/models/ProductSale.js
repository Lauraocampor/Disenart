//falta rechequear si es necesario que el nombre del form coincida con el de la tabla

module.exports = (sequelize, DataTypes) => {
	const alias = 'ProductSale';

	const cols = {
		id_productSale: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		shopping_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		quantity_sale: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		colour_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		size_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	};

	const config = {
		tableName: 'products_sales',
		timestamps: false,
	};

	const ProductSales = sequelize.define(alias, cols, config);

	return ProductSales;
};
