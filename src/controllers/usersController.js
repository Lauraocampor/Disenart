const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require("../models/usersModel");

const controller = {
    register: (req,res) => {
        res.render('register');
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }        
        let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

        const profileImage = req.file ? req.file.filename : 'default.png';

		let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
			avatar: profileImage
		}
        
		let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');
    },
    login: (req,res) => {
        res.render('login');
    }
};

module.exports = controller;
