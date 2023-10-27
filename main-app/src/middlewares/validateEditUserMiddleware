const { body } = require('express-validator');
const path = require('path');

const editValidations = [
	body('email')
		.notEmpty()
		.withMessage('Tienes que escribir un correo electrónico')
		.bail()
		.isEmail()
		.withMessage('El correo electrónico no es válido'),
	body('firstName').notEmpty().withMessage('Tienes que escribir un nombre').isLength({ min: 2 })
	.withMessage('El nombre debe tener al menos dos caracteres'),
	body('lastName').notEmpty().withMessage('Tienes que escribir un apellido').isLength({ min: 2 })
	.withMessage('El apellido debe tener al menos dos caracteres'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña').isLength({ min: 8})
	.withMessage('La contraseña debe tener al menos ocho caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/)
	.withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
	
]


module.exports = editValidations ;
