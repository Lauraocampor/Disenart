//falta rechequear si es necesario que el nombre del form coincida con el de la tabla

module.exports = (sequelize, DataTypes) => {
	const alias = 'Size';

	const cols = {
		id_size: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		size: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const config = {
		tableName: 'sizes',
		timestamps: false,
	};

	const Size = sequelize.define(alias, cols, config);

	return Size;
};
