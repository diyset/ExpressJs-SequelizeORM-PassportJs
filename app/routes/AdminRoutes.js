let adminController = require('../controllers/admincontroller');

module.exports = (app,passort) =>{
    app.get('/admin', isLoggedIn, adminController.index)

    function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}
}

