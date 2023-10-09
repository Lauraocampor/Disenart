const User = require('../models/usersModel');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false; // Se debe asumir que no está logeado.
	let emailInCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('email', emailInCookie);
	req.session = {
		userLogged: userFromCookie,
	};
	console.log(req.session);
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
	next();
}

module.exports = userLoggedMiddleware;
