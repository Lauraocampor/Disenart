const { body } = require('express-validator');

const validations = [
	body('email')
		.notEmpty()
		.withMessage('Tienes que escribir un correo electrónico')
		.bail()
		.isEmail()
		.withMessage('El correo electrónico no es válido'),
	body('firstName').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('date').notEmpty().withMessage('Tienes que elegir una fecha'),
];

module.exports = validations;
