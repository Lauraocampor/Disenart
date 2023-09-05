const fs = require("fs");
const path = require("path");
const uuid = require('uuid');

const User = {
	fileRoute: path.join(__dirname, "../data/users.json"),

	findAll: function () {
		return JSON.parse(fs.readFileSync(this.fileRoute, 'utf-8'));
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id ===id);
			return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	create: function (userData) {
		let allUsers = this.findAll();
	
		let newUser = {
			id: uuid.v4(),
			...userData,
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileRoute, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileRoute, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}




module.exports = User;