const express = require('express');
const router = express.Router();

const productControllerAPI = require('../api/productControllerAPI');

router.get('/', productControllerAPI.all);
router.get('/:id', productControllerAPI.getById);

module.exports = router;
