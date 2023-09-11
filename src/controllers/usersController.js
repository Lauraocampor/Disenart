const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require("../models/usersModel");

const controller = {
    mostrarModal: (req, res) => {
        // Renderiza la página que contiene el modal
        res.render('home',{ showModal: true });
    }, 
    register: (req, res) => {
        res.render('register',{ user: req.session.userToLogged  });
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body, 
                user: req.session.userToLogged,
                showModal: true, 
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
                oldData: req.body, 
                user: req.session.userToLogged  
            });
        }

        const profileImage = req.file ? req.file.filename : 'default.png';

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: profileImage
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('/');
    },
    login: (req, res) => {
        const userToLogin = User.findByField (req.body.email)

       res.render('login',{ user: req.session.userToLogged });
    },
  
    loginProcess: (req, res) => {
        const userToLogin = User.findByField("email", req.body.email);
    
        if (!userToLogin) {
            return res.render('login', {
                errors: {
                    email: {
                        msg: "El mail o la contraseña son incorrectos"
                    }
                    }, 
             user: req.session.userToLogged
               
            });
        }
    
        const isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
    
        if (!isOkPassword) {
            return res.render('login', {
                errors: {
                    email: {
                        msg: "El mail o la contraseña son incorrectos"
                    }
                }, 
         user: req.session.userToLogged
           
            });
        }
    
        delete userToLogin.password;
        req.session.userToLogged = userToLogin;
 
        if (req.body.remember_password) {
            res.cookie("userEmail", userToLogin.email,{ maxAge: 1000 * 60 * 60 * 24 * 365});
           
        }
    
        return res.redirect("/");
    },
    profile: (req, res) => {
        return res.render("userProfile",{  
        user: req.session.userToLogged})
    }, 


}


    module.exports = controller;
