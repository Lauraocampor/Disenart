const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const uuid = require('uuid');

const User = db.User;

const controller = {
	register: (req, res) => {
		res.render('register', { user: req.session.userLogged });
	},

	processRegister: async (req, res) => {
		try {
			const resultValidation = validationResult(req);
			if (resultValidation.errors.length > 0) {
				return res.render('register', {
					errors: resultValidation.mapped(),
					oldData: req.body,
					user: req.session.userLogged,
				});
			}
			const email = req.body.email;

			let userInDB = await User.findOne({
				where: { email_user: email },
				raw: true,
			});
			console.log(userInDB); // Sólo funciona con el console, verificar por qué

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
				id_user: uuid.v4(),
				name_user: req.body.firstName,
				lastname_user: req.body.lastName,
				email_user: req.body.email,
				password_user: bcryptjs.hashSync(req.body.password, 10),
				bdate_user: req.body.date,
				image_user: profileImage,
				category_id: 1,
			};

			await User.create(userToCreate);

			return res.redirect('/');
		} catch (error) {
			console.log(error);
		}
	},

	login: (req, res) => {
		res.render('login', { user: req.session.userLogged });
	},

	loginProcess: async (req, res) => {
		try {
			const email = req.body.email;
			let userToLogin = await User.findOne({
				where: { email_user: email },
				raw: true,
			});

			let password = req.body.password;

			if (userToLogin) {
				let isOkThePassword = bcryptjs.compareSync(
					password,
					userToLogin.password_user,
				);

				if (isOkThePassword) {
					//delete userToLogin.password; lo comente para poder traer la contraseña en el updatedProfile
					req.session.userLogged = userToLogin;
					console.log(userToLogin);

					if (req.body.remember_password) {
						res.cookie('userEmail', req.body.email, {
							maxAge: 1000 * 60 * 60 * 24 * 365,
						});
					}

					return res.redirect('/');
				}

				return res.render('login', {
					errors: {
						email: {
							msg: 'El mail o la contraseña son incorrectos',
						},
					},
					user: req.session.userLogged,
				});
			}

			return res.render('Login', {
				errors: {
					email: {
						msg: 'El mail o la contraseña son incorrectos',
					},
					user: req.session.userLogged,
				},
			});
		} catch (error) {
			console.log(error);
		}
	},

	profile: (req, res) => {
		console.log({ user: req.session.userLogged });
		return res.render('userProfile', {
			user: req.session.userLogged,
		});
	},

	editProfile: (req, res) => {
		console.log({ user: req.session.userLogged });
		return res.render('editProfile', { user: req.session.userLogged });
	},

	updateProfile: async (req, res) => {
		try {
			console.log({ user: req.session.userLogged });

			let updatedProfile = {
				id_user: req.session.userLogged.id_user,
			};

			const profileImage = req.file
				? req.file.filename
				: req.session.userLogged.image_user;

			updatedProfile = {
				...updatedProfile,
				name_user: req.body.firstName,
				lastname_user: req.body.lastName,
				password_user: bcryptjs.hashSync(req.body.password, 10),
				image_user: profileImage,
			};

			await User.update(updatedProfile, {
				where: {
					id_user: req.session.userLogged.id_user,
				},
			});

			return res.redirect('/users/Profile');
		} catch (error) {
			console.log(error);
		}
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},

	delete: async (req, res) => {
		try {
			console.log('usuario a eliminar' + { user: req.session.userLogged });

			let id = req.session.userLogged.id_user;

			await User.destroy({
				where: {
					id_user: id,
				},
			});
			res.clearCookie('userEmail');
			req.session.destroy();
			return res.redirect('/');
		} catch (error) {
			console.log(error);
		}
	},

	allProfiles: async (req, res) => {
		try {
			const allUsers = await User.findAll({ raw: true });
			console.log(allUsers);

			return res.render('allUsers', {
				allUsers: allUsers,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},

	profileDetail: async (req, res) => {
		try {
			const allUsers = await User.findAll();
			const id = req.params.id;
			const users = await User.findByPk(id);

			return res.render('profileDetail', {
				users: users,
				allUsers: allUsers,
				user: req.session.userLogged,
			});
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = controller;
