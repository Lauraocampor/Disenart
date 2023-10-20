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

		price_product: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},

		quantity_product: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		description_product: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		image_product: {
			type: DataTypes.STRING,
			allowNull: true, // cambio a true
		},
	};

	const config = {
		tableName: 'products_data',
		timestamps: false,
	};

	const Product = sequelize.define(alias, cols, config);

	Product.associate = (models) => {
		Product.belongsTo(models.Colour, {
			as: 'colour',
			timestamps: false,
			foreignKey: 'colour_id',
		});

		Product.belongsTo(models.Size, {
			as: 'size',
			timestamps: false,
			foreignKey: 'size_id',
		});

		Product.hasMany(models.ProductSale, {
			as: 'productSale',
			timestamps: false,
			foreignKey: 'product_id', // chequear si es el product_id de ProductSale o si es id_product de Product
		});

		Product.hasMany(models.Image, {
			// chequear si esta ok esto
			as: 'image',
			timestamps: false,
			foreignKey: 'product_id',
		});
	};

	return Product;
};
