const controller ={
    home: (req,res) => {
        console.log(req.session.user);
        res.render('home',{ user: req.session.userToLogged});
    }
}

module.exports = controller