//falta rechequear si es necesario que el nombre del form coincida con el de la tabla

module.exports = (sequelize, DataTypes) => {
	const alias = 'Size';

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

	return Colour;
};
