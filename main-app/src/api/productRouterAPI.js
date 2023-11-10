const express = require('express');
const router = express.Router();

const productControllerAPI = require('../api/productControllerAPI');

router.get('/', productControllerAPI.all);

module.exports = router;
