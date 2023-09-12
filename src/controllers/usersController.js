const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require("../models/usersModel");

const controller = {
    register: (req, res) => {
        res.render('register', { user: req.session.userToLogged });
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                user: req.session.userToLogged
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
        const userToLogin = User.findByField(req.body.email)

        res.render('login', { user: req.session.userToLogged });
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

        //delete userToLogin.password; lo comente para poder traer la contraseña en el updatedProfile
        req.session.userToLogged = userToLogin;

        if (req.body.remember_password) {
            res.cookie("userEmail", userToLogin.email, { maxAge: 1000 * 60 * 60 * 24 * 365 });

        }

        return res.redirect("/");
    },
    profile: (req, res) => {
        console.log({ user: req.session.userToLogged })
        return res.render("userProfile",
            { user: req.session.userToLogged })
    },

    editProfile: (req, res) => {
        console.log({ user: req.session.userToLogged })
        return res.render("editProfile",
            { user: req.session.userToLogged })
    },

    updateProfile: (req, res) => {
        console.log({ user: req.session.userToLogged })

        let updatedProfile = {
            id: req.session.userToLogged.id,
        };

        const profileImage = req.file ? req.file.filename : req.session.userToLogged.avatar;

        
        updatedProfile = {
            ...updatedProfile,
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: profileImage
        };

        User.updateProfile(updatedProfile);

        return res.render("userProfile",
            { user: req.session.userToLogged })

    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    delete: (req,res) =>{

        console.log( "usuario a eliminar" + { user: req.session.userToLogged })

        let id = req.session.userToLogged.id

        User.delete(id);
        return res.redirect('/');
    },

    allProfiles: (req,res) => {
        const allUsers = User.findAll();
        
        return res.render('allUsers', { allUsers: allUsers, user: req.session.userToLogged })
    },

    profileDetail: (req,res) => { //no esta funcionando
        const allUsers = User.findAll();
        const id = req.params.id
        const user = User.findByPk(id);

        return res.render('profileDetail',  {user: user, allUsers: allUsers, user: req.session.userToLogged })
    }




}


module.exports = controller;
