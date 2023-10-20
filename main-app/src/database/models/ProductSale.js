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
			references: {
				model: 'shopping_cart',
				key: 'id_shopping',
			},
		},

		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'products_data',
				key: 'id_product',
			},
		},

		quantity_sale: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		// ver si es necesario que esten aca colour y size, porque en realidad ya se traen desde el product id
		colour_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'colours',
				key: 'id_colour',
			},
		},
		size_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'sizes',
				key: 'id_size',
			},
		},
	};

	const config = {
		tableName: 'products_sales',
		timestamps: false,
	};

	const ProductSale = sequelize.define(alias, cols, config);

	ProductSale.associate = (models) => {
		ProductSale.belongsTo(models.Cart, {
			as: 'shoppingCart',
			timestamps: false,
			foreignKey: 'id_shopping',
		});

		ProductSale.belongsTo(models.Product, {
			as: 'product',
			timestamps: false,
			foreignKey: 'id_product',
		});

		// si no es necesaria la relacion con colour y size, borrar los dos belongsTo de aca abajo

		ProductSale.belongsTo(models.Colour, {
			as: 'colour',
			timestamps: false,
			foreignKey: 'id_colour',
		});

		ProductSale.belongsTo(models.Size, {
			as: 'size',
			timestamps: false,
			foreignKey: 'id_size',
		});
	};

	return ProductSale;
};
