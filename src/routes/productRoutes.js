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

router.get('/details', productController.details);
router.get('/cart', productController.cart);

/*** CREATE ONE PRODUCT ***/ 
router.get('/createProduct', productController.createProduct);
router.post('/', upload.any('productImages'), productController.store); 

router.get('/editProduct/:id', productController.editProduct);


// @GET - /products/:id/edit
router.put('/:id/editProduct', productController.updateProduct);


module.exports = router