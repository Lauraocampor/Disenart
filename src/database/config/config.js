module.exports = {
	development: {
		username: 'root',
		password: process.env.DB_PASS || null,
		database: 'database_disenart',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	test: {
		username: 'root',
		password: process.env.DB_PASS || null,
		database: 'database_disenart',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	production: {
		username: 'root',
		password: process.env.DB_PASS || null,
		database: 'database_disenart',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
};
