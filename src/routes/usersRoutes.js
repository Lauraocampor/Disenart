const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');


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

const validations = [
	body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico'),
    body('firstName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
	body('category').notEmpty().withMessage('Tienes que elegir una categoría'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		}
		return true;
	}),
    body('day').notEmpty().withMessage('Tienes que elegir un día'),
    body('month').notEmpty().withMessage('Tienes que elegir un mes'),
    body('year').notEmpty().withMessage('Tienes que elegir un año'),
];

// @GET REGISTER FORM
router.get('/register', usersController.register);

// @POST PROCESS REGISTER
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// @GET LOGIN FORM
router.get('/login', usersController.login);

// @GET PROFILE USER /profile/:userId

module.exports = router;
