//falta rechequear si es necesario que el nombre del form coincida con el de la tabla

module.exports = (sequelize, DataTypes) => {
	const alias = 'Colour';

	const cols = {
		id_colour: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		colour: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const config = {
		tableName: 'colours',
		timestamps: false,
	};

	const Colour = sequelize.define(alias, cols, config);

	Colour.associate = (models) => {
		Colour.hasMany(models.Product, {
			as: 'product',
			timestamps: false,
			foreignKey: 'colour_id',
		});

		Colour.hasMany(models.ProductSale, {
			as: 'productSale',
			timestamps: false,
			foreignKey: 'colour_id',
		});
	};

	return Colour;
};
