//falta rechequear si es necesario que el nombre del form coincida con el de la tabla

module.exports = (sequelize, DataTypes) => {
	const alias = 'Cart';

	const cols = {
		id_shopping: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		user_id: {
			type: DataTypes.UUIDV4,
			allowNull: false,
		},

		quantity_shop: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		tprice_shop: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
	};

	const config = {
		tableName: 'shopping_cart',
		timestamps: false,
	};

	const Cart = sequelize.define(alias, cols, config);

	return Cart;
};
