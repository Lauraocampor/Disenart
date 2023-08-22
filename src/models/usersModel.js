const { json } = require("express");
const fs = require("fs");
const path = require("path");

// Ruta del archivo JSON
const modelo = {
  fileRoute: path.join(__dirname, "../data/users.json"),

  findAll: () => {
    // Buscamos el contenido del archivo JSON
    const jsonData = fs.readFileSync(modelo.fileRoute, "utf-8");
    // Convertimos el JSON en Javascript
    const users = JSON.parse(jsonData);

    return users;
  },

  findById: (id) => {
    const users = modelo.findAll();

    const selectedUser = users.find(
      (userActual) => userActual.id == id
    );

    return selectedUser;
  }
};

module.exports = modelo;