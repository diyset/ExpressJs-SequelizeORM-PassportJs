let detailProfileController = require('../controllers/detailprofilecontroller');

module.exports = (app)=>{
    app.get('/detailprofile',isLoggedIn,detailProfileController.detail)
    // app.post('/')
    app.post('/updatefotoprofile',isLoggedIn,detailProfileController.updateFotoProfile)
    function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                return next();
        res.redirect('/signin');
    }
}