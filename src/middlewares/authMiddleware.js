function authMiddleware(req,res,next) {
    if (!req.session.userToLogged){
        return res.redirect('/users/login');
    }
    next();
}
module.exports = authMiddleware