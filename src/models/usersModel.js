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

	updateProfile: (updatedProfile) => {
		// Buscar array de usuarios ya existentes
		let users = User.findAll();
	
		// Conseguir en qué indice de ese array, está guardado el usuario del id en cuestión
		const userIndex = users.findIndex(
		  (usuarioActual) => usuarioActual.id === updatedProfile.id
		);
	
	
		// Verificar si se encontró el usuario
		if (userIndex !== -1) {
		  // Actualizar todos los parámetros del usuario excepto las imágenes
		  const { avatar, ...otherParams } = updatedProfile;
		  users[userIndex] = { ...users[userIndex], ...otherParams };

		  // Actualizar la imagen de perfil si se seleccionó una nueva
	 if (avatar.length > 0) {
		users[userIndex].avatar = avatar;
	  }
	
		};
	
	
		// Convertir este nuevo array en JSON
		const usersJson = JSON.stringify(users);
		// Guardar todo al JSON
		fs.writeFileSync(User.fileRoute, usersJson, "utf-8");
	  },

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
		fs.writeFileSync(this.fileRoute, JSON.stringify(finalUsers, null, ' '));
		return true;
	}
}




module.exports = User;