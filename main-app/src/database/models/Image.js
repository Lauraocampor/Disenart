module.exports = (sequelize, DataTypes) => {
	const alias = 'Image';

	const cols = {
		id_image: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
            references: {
				model: 'products_data',
				key: 'id_product',
			},
		},

		filename_img: {
			type: DataTypes.STRING,
			allowNull: true,

		}

	};

	const config = {
		tableName: 'images',
		timestamps: false,
	};

	const Image = sequelize.define(alias, cols, config);

	Image.associate = (models) => {
		Image.belongsTo(models.Product, {
			as: 'product',
			timestamps: false,
			foreignKey: 'product_id',
		});
	};

	return Image;
};
