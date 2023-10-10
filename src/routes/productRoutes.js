const express = require ('express');
const router = express.Router();
const multer = require('multer')

const productController = require ('../controllers/productControllers');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/productos'); 
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

//@GET products/:id/details -> products/2/details
router.get('/:id/details', productController.details);  // cambiado, falta chequear tema imagenes. quedo la vista cargada con imagenes random para ver que funciona
router.get('/cart', productController.cart); // no cambiado

/*** CREATE ONE PRODUCT ***/ 
router.get('/createProduct', productController.createProduct); // cambiado
router.post('/', upload.any('productImages'), productController.store);   // cambiado, falta chequear tema imagenes


// @GET - /products/:id/edit
router.get('/:id/editProduct', productController.editProduct); // cambiado 
router.put('/:id/editProduct', upload.any("productImages"), productController.updateProduct);  // cambiado, falta chequear tema imagenes

//@DELETE - /products/:id/delete --
router.delete('/:id/delete', productController.deleteProduct); // cambiado

// @GET - products/:id -> products/1 visualizacion de productos del lado del cliente
router.get('/:id',upload.any('productImages'), productController.userProduct) // cambiado, falta chequear tema imagenes

// @GET - LISTA DE PRODUCTS
router.get("/searching/searchResults/:category?", productController.searchResults); // ok cambiado el ejs, no el controller

module.exports = router