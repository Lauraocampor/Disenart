module.exports = (sequelize, DataTypes) => {
	const alias = 'User';

	const cols = {
		id_user: {
			type: DataTypes.STRING,
			primaryKey: true,
		},

		name_user: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},

		lastname_user: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},

		email_user: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		password_user: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},

		bdate_user: {
			type: DataTypes.DATE,
		},

		image_user: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		category_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'usercategories',
				key: 'id_category',
			},
		},
	};

	const config = {
		tableName: 'users',
		timestamps: false,
	};

	const User = sequelize.define(alias, cols, config);

	User.associate = (models) => {
		User.belongsTo(models.UserCategory, {
			as: 'category',
			timestamps: false,
			foreignKey: 'id_category',
		});

		User.hasMany(models.Cart, {
			as: 'cart',
			timestamps: false,
			foreignKey: 'id_shopping',
		});
	};

	return User;
};
