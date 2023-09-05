const express = require ('express');
const router = express.Router();

// Controller
const usersController = require ('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


// @GET REGISTER FORM
router.get('/register', usersController.register);


// @POST PROCESS REGISTER
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);


// @GET LOGIN FORM
router.get('/login', usersController.login);

// @POST LOGIN FORM
router.post('/login',  validations,usersController.loginProcess);

// @GET PROFILE USER /profile/
router.get('/profile', /* authMiddleware, */ usersController.profile)

//@GET ALL USERS /allProfiles
//router.get('/allProfiles', usersController.allProfiles)


module.exports = router;
