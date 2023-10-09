module.exports = (sequelize, DataTypes) => {
	const alias = 'UserCategory';

	const cols = {
		id_category: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
		},

		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const config = {
		tableName: 'userscategories',
		timestamps: false,
	};

	const UserCategory = sequelize.define(alias, cols, config);

	UserCategory.associate = (models) => {
		UserCategory.hasMany(models.User, {
			as: 'users',
			timestamps: false,
			foreignKey: 'id_shopping',
		});
	};

	return UserCategory;
};
