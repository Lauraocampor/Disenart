const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const modelo = {fileRoute: path.join(__dirname, '../data/productModel.json'),


    // Traer todos los productos
    findAll: function () {
 // Buscamos el contenido del archivo JSON
 const jsonData = fs.readFileSync(modelo.fileRoute, 'utf-8');
 // Convertimos el JSON en Javascript
 const products = JSON.parse(jsonData);

 return products;
},

    // Traer un producto según su ID
    findById: (id) => {
        const products = modelo.findAll();
        const selectedProduct = products.find(productoActual => productoActual.id == id);
        return selectedProduct;
    },


 // Editar un producto

 updateProduct: (updatedProduct) => {
    // Buscar array de productos ya existentes
    let products = modelo.findAll();
    // Conseguir en qué indice de ese array, está guardado el producto del id en cuestión
    const prodIndex = products.findById(productoActual => productoActual.id === updatedProduct.id);
    // Modificar el elemento del array en ese índice, por el que nos pasaron por parámetro
    products[prodIndex] = updatedProduct;
    // Convertir este nuevo array en JSON
    const productsJson = JSON.stringify(products);
    // Guardar todo al JSON
    fs.writeFileSync(modelo.fileRoute, productsJson, 'utf-8');

}

}