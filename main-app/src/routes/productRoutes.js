const express = require('express');
const router = express.Router();
const multer = require('multer');

const productController = require('../controllers/productControllers');
const validateProductMiddleware = require('../middlewares/validateProductMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/productos');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	},
});

const upload = multer({ storage });

// @GET - LISTA DE PRODUCTS CLIENTE - COMPRAR
router.get(
	'/searching/searchResults/:category?', 
	productController.searchResults,
); 

// @GET - products/:id/customer -> products/1/customer visualizacion de productos del lado del cliente
router.get(
	'/:id/customer',
	upload.any('productImages'), guestMiddleware,
	productController.customerProduct,
);


//@GET products/:id/details -> products/2/details
router.get('/:id/details', authMiddleware, productController.details); // cambiado
router.get('/cart', productController.cart); // no cambiado


/*** CREATE ONE PRODUCT ***/
router.get('/createProduct', authMiddleware, productController.createProduct); // cambiado
router.post('/', upload.any('productImages'), validateProductMiddleware, productController.store); // cambiado

// @GET - /products/:id/edit
router.get('/:id/editProduct', authMiddleware, productController.editProduct); // cambiado
router.put(
	'/:id/editProduct',
	upload.any('productImages'), 
	validateProductMiddleware, 
	productController.updateProduct,
);
//@DELETE - /products/:id/delete --
router.delete('/:id/delete', authMiddleware, productController.deleteProduct); // cambiado


// @GET - LISTA DE PRODUCTS USER - VER PRODUCTO
router.get(
	'/searching/searchResultsUser/:category?', authMiddleware,
	productController.searchResultsUser,
); 


// @GET y @POST - color
router.get('/colours', authMiddleware, productController.createColour);
router.post('/colours', authMiddleware, productController.createdColour);

// @GET y @POST - size
router.get('/sizes', authMiddleware, productController.createSize);
router.post('/sizes', authMiddleware, productController.createdSize);

module.exports = router;
