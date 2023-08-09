const express = require ('express');
const router = express.Router();

const productController = require ('../controllers/productControllers');

router.get('/details', productController.details);
router.get('/cart', productController.cart);
router.get('/createProduct', productController.createProduct);
router.get('/:id/editProduct', productController.editProduct);


// @GET - /products/:id/edit
router.put('/:id/editProduct', productController.updateProduct);


module.exports = router