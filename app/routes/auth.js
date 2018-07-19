var authController = require('../controllers/authcontroller.js');
var productController= require('../controllers/productcontroller');

module.exports = function(app,passport){

app.get('/signup', authController.signup);

app.get('/signin', authController.signin);


app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/index',
                                                    failureRedirect: '/signupv2'}
                                                    ));

app.get('/logout',authController.logout);
app.get('/', authController.menu);
app.get('/index', authController.menu);
app.get('/signupv2',authController.signupv2)

app.get('/login',authController.login);

app.post('/signin', function(req, res, next) {
        passport.authenticate('local-signin',
            function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/signin');
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    if(user.role=='superadmin'){
                        return res.redirect('/admin');
                    }else{
                        return res.redirect('/index');
                    }

                });
            })(req,res,next)
    });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}

}