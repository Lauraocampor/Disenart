const express = require('express');
const router = express.Router();
const multer = require('multer');

const productController = require('../controllers/productControllers');
const validateProductMiddleware = require('../middlewares/validateProductMiddleware');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/productos');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	},
});

const upload = multer({ storage });

//@GET products/:id/details -> products/2/details
router.get('/:id/details', productController.details); // cambiado
router.get('/cart', productController.cart); // no cambiado


/*** CREATE ONE PRODUCT ***/
router.get('/createProduct', productController.createProduct); // cambiado
router.post('/', upload.any('productImages'), validateProductMiddleware, productController.store); // cambiado

// @GET - /products/:id/edit
router.get('/:id/editProduct', productController.editProduct); // cambiado
router.put(
	'/:id/editProduct',
	upload.any('productImages'),
	productController.updateProduct,
);
//@DELETE - /products/:id/delete --
router.delete('/:id/delete', productController.deleteProduct); // cambiado

// @GET - products/:id/cliente -> products/1 visualizacion de productos del lado del cliente
router.get(
	'/:id/cliente',
	upload.any('productImages'),
	productController.userProduct,
); // cambiado

// @GET - LISTA DE PRODUCTS
router.get(
	'/searching/searchResults/:category?',
	productController.searchResults,
); // ok cambiado el ejs, no el controller

// @GET y @POST - color
router.get('/colours', productController.createColour);
router.post('/colours', productController.createdColour);

// @GET y @POST - color
router.get('/colours', productController.createColour);
router.post('/colours', productController.createdColour);

// @GET y @POST - size
router.get('/sizes', productController.createSize);
router.post('/sizes', productController.createdSize);

module.exports = router;
