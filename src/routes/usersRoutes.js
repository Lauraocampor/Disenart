const express = require ('express');
const router = express.Router();

const usersController = require ('../controllers/usersController');


// @GET REGISTER FORM
router.get('/register', usersController.register);

// @GET LOGIN FORM
router.get('/login', usersController.login);

// @GET PROFILE USER /profile/:userId

module.exports = router;
