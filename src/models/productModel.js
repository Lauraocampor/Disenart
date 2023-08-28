const { json } = require("express");
const fs = require("fs");
const path = require("path");

// Ruta del archivo JSON
const modelo = {
  fileRoute: path.join(__dirname, "../data/productData.json"),

  findAll: () => {
    // Buscamos el contenido del archivo JSON
    const jsonData = fs.readFileSync(modelo.fileRoute, "utf-8");
    // Convertimos el JSON en Javascript
    const products = JSON.parse(jsonData);

    return products;
  },

  findById: (id) => {
    const products = modelo.findAll();

    const selectedProduct = products.find(
      (productoActual) => productoActual.id == id
    );

    return selectedProduct;
  },

  // Editar un producto

  updateProduct: (updatedProduct) => {
    // Buscar array de productos ya existentes
    let products = modelo.findAll();

    // Conseguir en qué indice de ese array, está guardado el producto del id en cuestión
    const prodIndex = products.findIndex(
      (productoActual) => productoActual.id === updatedProduct.id
    );


// Verificar si se encontró el producto
if (prodIndex !== -1) {
  // Actualizar todos los parámetros del producto excepto las imágenes
  const { productImages, ...otherParams } = updatedProduct;
  products[prodIndex] = { ...products[prodIndex], ...otherParams };

  // Actualizar las imágenes si se proporcionaron nuevas
  if (productImages && productImages.length > 0) {
    products[prodIndex].productImages = [...productImages];
  }
};


    // Convertir este nuevo array en JSON
    const productsJson = JSON.stringify(products);
    // Guardar todo al JSON
    fs.writeFileSync(modelo.fileRoute, productsJson, "utf-8");
  },

  //Crear un producto

  createProduct: (bodyData) => {
    let products = modelo.findAll();

    const lastProdId = products[products.length - 1].id;

    let newProduct = {
      id: lastProdId + 1,
      ...bodyData,
    };

    products.push(newProduct);

    // Convertimos el Javascript en JSON
    const jsonData = JSON.stringify(products);

    fs.writeFileSync(modelo.fileRoute, jsonData, "utf-8");

    return newProduct;
  },

  //Eliminar un producto

  delete: (id) => {
    let products = modelo.findAll();

    //filtro todos los productos que sean distintos al id pasado como parametro para poder eliminarlo
    products = products.filter((productoActual) => productoActual.id !== id);

    //convertimos el js a JSON
    const jsonProducts = JSON.stringify(products);

    fs.writeFileSync(modelo.fileRoute, jsonProducts, "utf-8");
  },

  // SEARCH RESULTS BY HAMBURGER 
  categoryResults: function (category) {
    const products = modelo.findAll();
    const productsFiltered = products.filter((x) => x.productName.toLowerCase() === category.toLowerCase());
    return productsFiltered;
  },
  // SEARCH RESULTS BY QUERY
  valueCheck: function(object, value) {
    const valueArray = Object.values(object);
    const regex = new RegExp(value, 'i'); 
    for (let i = 0; i < valueArray.length; i++) {
      if (typeof valueArray[i] === 'string' && regex.test(valueArray[i])) {
          return true;
      }
    }
    return false;
  },
  queryResults: function (query) {
    const products = modelo.findAll();
    const productsFiltered = products.filter((x) => modelo.valueCheck(x, query));
    return productsFiltered;
  }
};

module.exports = modelo;
