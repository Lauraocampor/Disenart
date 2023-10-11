const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/usersModel');

const controller = {
	register: (req, res) => {
		res.render('register', { user: req.session.userLogged });
	},

	processRegister: (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body,
				user: req.session.userLogged,
			});
		}
		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado',
					},
				},
				oldData: req.body,
				user: req.session.userLogged,
			});
		}

		const profileImage = req.file ? req.file.filename : 'default.png';

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: profileImage,
		};

		let userCreated = User.create(userToCreate);

		return res.redirect('/');
	},

	login: (req, res) => {
		const userToLogin = User.findByField(req.body.email);

		res.render('login', { user: req.session.userLogged });
	},

	loginProcess: (req, res) => {
		const userToLogin = User.findByField('email', req.body.email);

		if (!userToLogin) {
			return res.render('login', {
				errors: {
					email: {
						msg: 'El mail o la contraseña son incorrectos',
					},
				},
				user: req.session.userLogged,
			});
		}

		const isOkPassword = bcryptjs.compareSync(
			req.body.password,
			userToLogin.password,
		);

		if (!isOkPassword) {
			return res.render('login', {
				errors: {
					email: {
						msg: 'El mail o la contraseña son incorrectos',
					},
				},
				user: req.session.userLogged,
			});
		}

		//delete userToLogin.password; lo comente para poder traer la contraseña en el updatedProfile
		req.session.userLogged = userToLogin;

		if (req.body.remember_password) {
			res.cookie('userEmail', userToLogin.email, {
				maxAge: 1000 * 60 * 60 * 24 * 365,
			});
		}

		return res.redirect('/');
	},

	profile: (req, res) => {
		console.log({ user: req.session.userLogged });
		return res.render('userProfile', { user: req.session.userLogged });
	},

	editProfile: (req, res) => {
		console.log({ user: req.session.userLogged });
		return res.render('editProfile', { user: req.session.userLogged });
	},

	updateProfile: (req, res) => {
		console.log({ user: req.session.userLogged });

		let updatedProfile = {
			id: req.session.userLogged.id,
		};

		const profileImage = req.file
			? req.file.filename
			: req.session.userLogged.avatar;

		updatedProfile = {
			...updatedProfile,
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: profileImage,
		};

		User.updateProfile(updatedProfile);

		return res.render('userProfile', { user: req.session.userLogged });
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},

	delete: (req, res) => {
		console.log('usuario a eliminar' + { user: req.session.userLogged });

		let id = req.session.userLogged.id;

		User.delete(id);
		return res.redirect('/');
	},

	allProfiles: (req, res) => {
		const allUsers = User.findAll();

		return res.render('allUsers', {
			allUsers: allUsers,
			user: req.session.userLogged,
		});
	},

	profileDetail: (req, res) => {
		const allUsers = User.findAll();
		const id = req.params.id;
		const users = User.findByPk(id);

		return res.render('profileDetail', {
			users: users,
			allUsers: allUsers,
			user: req.session.userLogged,
		});
	},
};

module.exports = controller;
