module.exports = (sequelize, DataTypes) => {
	const alias = 'UserCategory';

	const cols = {
		id_category: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},

		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const config = {
		tableName: 'users_categories',
		timestamps: false,
	};

	const UserCategory = sequelize.define(alias, cols, config);

	UserCategory.associate = (models) => {
		UserCategory.hasMany(models.User, {
			as: 'users',
			timestamps: false,
			foreignKey: 'category_id',
		});
	};

	return UserCategory;
};
