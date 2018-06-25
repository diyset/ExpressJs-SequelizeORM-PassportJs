let detailProfileController = require('../controllers/detailprofilecontroller');

module.exports = (app)=>{
    app.get('/detailprofile',isLoggedIn,detailProfileController.detail)


    function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                return next();
        res.redirect('/signin');
    }
}