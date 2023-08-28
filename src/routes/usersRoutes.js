const express = require ('express');
const router = express.Router();

// Controller
const usersController = require ('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');


// @GET REGISTER FORM
router.get('/register', usersController.register);

// @POST PROCESS REGISTER
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// @GET LOGIN FORM
router.get('/login', usersController.login);

// @GET PROFILE USER /profile/:userId

module.exports = router;
