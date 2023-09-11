const guestMiddleware = function (req, res, next){
    if (req.session.userToLogged) {
		return res.redirect('/users/profile');
	}
	next();
}

module.exports = guestMiddleware;