const express = require('express');
const router = express.Router();


// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const editValidations = require('../middlewares/validateEditUserMiddleware');

// @GET REGISTER FORM  /users/register
router.get('/register', guestMiddleware, usersController.register);

// @POST PROCESS REGISTER  /users/register
router.post(
	'/register',
	uploadFile.single('avatar'),
	validations,
	usersController.processRegister,
);

// @GET LOGIN FORM /users/login
router.get('/login', guestMiddleware, usersController.login);


// @POST LOGIN FORM /users/login
router.post('/login', validations, usersController.loginProcess);

// @GET PROFILE USER /users/profile
router.get('/profile', authMiddleware, usersController.profile);

// @GET PROFILE USER EDIT -> /users/profile/edit
router.get('/profile/edit', authMiddleware, usersController.editProfile);

//@PUT PROFILE USER EDIT /users/profile/edit
router.put(
	'/profile/edit',
	uploadFile.single('avatar'),
	editValidations,
	usersController.updateProfile,
);

//@DELETE user /users/profile/delete
router.delete('/profile/delete', usersController.delete);

//@GET ALL USERS /users/allProfiles
router.get('/allProfiles', usersController.allProfiles);

//@GET USER DETAIL  /users/profile/:id/detail
router.get('/profile/:id/detail', usersController.profileDetail);

module.exports = router;
