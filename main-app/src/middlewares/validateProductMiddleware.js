const { body } = require('express-validator');
const path = require('path');


const productValidations = [
	body('productName')
		.notEmpty()
		.withMessage('Tienes que escribir un nombre')
		.isLength({ min: 5 })
        .withMessage('El nombre debe tener al menos 5 caracteres'),
    body('productColor')
    .notEmpty()
    .withMessage('Debes elegir o crear un color'),
    body('productSize')
    .notEmpty()
    .withMessage('Debes elegir o crear un talle'),
	body('productPrice').notEmpty().withMessage('Tienes que escribir un precio'),
	body('productDescription').notEmpty().isLength({ min: 20 }).withMessage('Tienes que escribir una descripción de al menos 20 caracteres'),
    body('productStock').notEmpty().withMessage('Tienes que escribir una cantidad'),
    body('productImages').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones aceptadas de imágenes son ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true; 
    })
]

module.exports = productValidations;

