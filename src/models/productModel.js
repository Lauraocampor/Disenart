const fs = require('fs');
const path = require('path');

const model = {
    // Ruta del archivo JSON
    route: '../data/productData.json',

    // Traer todos los productos
    findAll: function () {
        const productsJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');

        const products = JSON.parse(productsJSON);

        return products;
    },

    // Traer un producto según su ID
    findById: function (id) {
        const products = this.findAll();

        let searched = products.find(product => product.id === id);

        if (!searched) {
            searched = null;
        }

        return searched;
    },

 // Editar un producto

 updateById: function (id, newData) {
    // Buscamos el array de productos
    let products = this.findAll();

    // Con el findIndex, buscamos en qué indice del array de productos, está guardado el elemento buscado
    const indice = products.findIndex(productoActual => productoActual.id === id);

    // Actualizamos los datos del producto que corresponda, con los datos que nos pasaron por parámetros
    products[indice].productName = newData.productName ;
    products[indice].productColor = newData.productColor;
    products[indice].productSize = newData.productSize;
    products[indice].productPrice = newData.productPrice;
    products[indice].productStock = newData.productStock;
    products[indice].productImages= newData.productImages;

    // Convertimos nuestro array de JS a un array de JSON
    const productsJSON = JSON.stringify(products);

    // Guardamos este nuevo array de JSON en el archivo correspondiente
    fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

    return products;
}

}