const { body } = require('express-validator');

const validations = [
	body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('El correo electrónico no es válido'),
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

module.exports = validations;