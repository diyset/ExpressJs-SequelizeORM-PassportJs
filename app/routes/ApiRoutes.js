let apiController = require('../controllers/apicontroller');

module.exports = (app)=>{
    app.get('/api/findDetailUser',isLoggedIn, apiController.findDetailUser);
    app.get('/api/findallproduct',apiController.findAllProduct);
    app.get('/api/findallproduct/:idKategori',apiController.findProductByKategori);
    app.get('/api/findallbooking',apiController.findAllBooking)
    app.get('/api/findallbookingbyuser',isLoggedIn,apiController.findAllBookingByUser)
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}