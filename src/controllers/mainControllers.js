const controller = {
	home: (req, res) => {
		res.render('home', { user: req.session.userLogged });
	},
	logout: (req, res) => {
		req.session = { ...req.session.userLogged };
		console.log(req.session.userLogged);
		if (req.session.userLogged) {
			req.session.destroy((err) => {
				if (err) {
					console.error('Error al destruir la sesión:', err);
				}
				res.clearCookie('userEmail');
				return res.redirect('/');
			});
		} else {
			res.clearCookie('userEmail');
			return res.redirect('/');
		}
	},
};

module.exports = controller;
