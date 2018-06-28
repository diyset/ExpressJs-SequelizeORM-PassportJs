var authController = require('../controllers/authcontroller.js');
var productController= require('../controllers/productcontroller');

module.exports = function(app,passport){

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);

app.get('/product/detailproduct/:idproduct',isLoggedIn, productController.findOneDetailProduct);
app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/index',
                                                    failureRedirect: '/signupv2'}
                                                    ));

app.get('/logout',authController.logout);
app.get('/', authController.menu);
app.get('/index',authController.menu);
app.get('/signupv2',authController.signupv2)



app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/index',
                                                    failureRedirect: '/signin'}
                                                    ));
app.get('/login',authController.login);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}