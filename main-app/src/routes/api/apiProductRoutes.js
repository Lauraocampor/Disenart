const express = require('express');
const router = express.Router();

const controller = require('../../controllers/api/apiProductController');


// @GET - /api/products
router.get('/', controller.getProducts);

// @GET - /api/products/:id/detail
router.get('/:id/detail', controller.getProductById);


module.exports = router;