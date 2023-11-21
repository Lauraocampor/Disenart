const express = require('express');
const router = express.Router();
const multer = require('multer');

// Controller
const productController = require('../controllers/productControllers');

// Middlewares
const validateProductMiddleware = require('../middlewares/validateProductMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/productos');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	},
});

const upload = multer({ storage });

// @GET - LISTA DE PRODUCTS CLIENTE - COMPRAR - chequear si authdmiddleware esta ok acá
router.get(
	'/searching/searchResults/:category?',
	guestMiddleware,
	productController.searchResults,
);

// @GET - products/:id/customer -> products/1/customer visualizacion de productos del lado del cliente
router.get(
	'/:id/customer',
	upload.any('productImages'),
	guestMiddleware,
	productController.customerProduct,
);

//@GET products/:id/details -> products/2/details detalle de producto del usuario
router.get('/:id/details', authMiddleware, productController.details);

//@GET /products/cart -> carrito
router.get('/cart', productController.cart);

//@GET /products/createProduct
router.get('/createProduct', authMiddleware, productController.createProduct);

//@POST /products
router.post(
	'/',
	upload.any('productImages'),
	validateProductMiddleware,
	productController.store,
);

// @GET - /products/:id/edit
router.get('/:id/editProduct', authMiddleware, productController.editProduct);

// @PUT /products/:id/editProduct
router.put(
	'/:id/editProduct',
	upload.any('productImages'),
	validateProductMiddleware,
	productController.updateProduct,
);

//@DELETE - /products/:id/delete --
router.delete('/:id/delete', authMiddleware, productController.deleteProduct);

// @GET /products/searching/searchResultsUser/:category? -
// LISTA DE PRODUCTS USER - VER PRODUCTO
router.get(
	'/searching/searchResultsUser/:category?',
	authMiddleware,
	productController.searchResultsUser,
);

// @GET  /products/color
router.get('/colours', authMiddleware, productController.createColour);

// @POST - /products/color
router.post('/colours', authMiddleware, productController.createdColour);

// @GET /products/size
router.get('/sizes', authMiddleware, productController.createSize);

// @POST - /products/size
router.post('/sizes', authMiddleware, productController.createdSize);

module.exports = router;
