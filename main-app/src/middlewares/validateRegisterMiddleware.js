const { body } = require('express-validator');
const path = require('path');

const validations = [
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
	.withMessage('La contraseña debe tener al menos ocho caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!.]).*$/)
	.withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'),
	body('date').notEmpty().withMessage('Tienes que elegir una fecha'),
	body('avatar')
	.custom((value, { req }) => {
		let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
				throw new Error(`La imagen debe ser un archivo ${acceptedExtensions.join(', ')}`);
            }
        }
        return true 
    })
]


module.exports = validations;
