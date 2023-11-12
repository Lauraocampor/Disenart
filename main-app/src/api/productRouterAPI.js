const express = require('express');
const router = express.Router();

const productControllerAPI = require('../api/productControllerAPI');

// @GET - /api/products
router.get('/', productControllerAPI.all);
// @GET - /api/products/:id
router.get('/:id', productControllerAPI.getById);

module.exports = router;
