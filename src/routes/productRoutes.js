const express = require ('express');
const router = express.Router();

const productController = require ('../controllers/productControllers');

router.get('/details', productController.details);
router.get('/cart', productController.cart);
router.get('/createProduct', productController.createProduct);
router.get('/editProduct/:id', productController.editProduct);








// @PUT /products/:id/update ---> /products/5/put
router.put('/:id/update', productController.updateProduct);

module.exports = router