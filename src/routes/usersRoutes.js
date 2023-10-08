const express = require ('express');
const router = express.Router();

// Controller
const usersController = require ('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');


// @GET REGISTER FORM
router.get('/register', guestMiddleware, usersController.register);


// @POST PROCESS REGISTER
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);


// @GET LOGIN FORM
router.get('/login', guestMiddleware, usersController.login);

// @POST LOGIN FORM
router.post('/login',  validations,usersController.loginProcess);

// @GET PROFILE USER /profile/
router.get('/profile', authMiddleware,  usersController.profile);

// @GET PROFILE USER EDIT -> /users/profile/edit
router.get('/profile/edit', authMiddleware, usersController.editProfile);

//@PUT PROFILE USER EDIT 
router.put('/profile/edit', uploadFile.single('avatar'), usersController.updateProfile);

//@DELETE user
router.delete('/profile/delete', usersController.delete)


//@GET ALL USERS /allProfiles
router.get('/allProfiles', usersController.allProfiles)

//@GET USER DETAIL 
router.get('/profile/:id/detail', usersController.profileDetail)


module.exports = router;
