let adminController = require('../controllers/admincontroller');

module.exports = (app) =>{
    app.get('/admin', isLoggedIn,isAdmin, adminController.index)

    function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}
function isAdmin(req,res,next) {
        let profile = req.user
        if(profile.role=='superadmin'){
            return next();
        }
            res.redirect('/')
}
}

