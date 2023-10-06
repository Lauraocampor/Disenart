//falta rechequear si es necesario que el nombre del form coincida con el de la tabla

module.exports = (sequelize, DataTypes) => {
	const alias = 'Product';

	const cols = {
		id_product: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		name_product: {
			type: DataTypes.STRING,
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
		price_product: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		description_product: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		image_product: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const config = {
		tableName: 'products_data',
		timestamps: false,
	};

	const Product = sequelize.define(alias, cols, config);

	return Product;
};
