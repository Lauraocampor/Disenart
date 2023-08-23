const express = require ('express');
const router = express.Router();
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users'); 
    },
    filename: (req, file, cb) => {
        
        cb(null, Date.now() + file.originalname);
    }
});

const uploadFile = multer({ storage });

const usersController = require ('../controllers/usersController');

// @GET REGISTER FORM
router.get('/register', usersController.register);

// @POST PROCESS REGISTER
router.post('/register', uploadFile.single('avatar'), usersController.processRegister);

// @GET LOGIN FORM
router.get('/login', usersController.login);

// @GET PROFILE USER /profile/:userId

module.exports = router;
