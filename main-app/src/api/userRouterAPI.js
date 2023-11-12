const express = require('express');
const router = express.Router();

const controller = require('../api/userControllerAPI');


// @GET - /api/users
router.get('/', controller.getUsers);

// @GET - /api/users/:id/detail
router.get('/:id/detail', controller.getUserById);


module.exports = router;