const controller = {
	home: (req, res) => {
		console.log(req.session.user);
		res.render('home', { user: req.session.userLogged });
	},
	logout: (req, res) => {
		if (req.session) {
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
