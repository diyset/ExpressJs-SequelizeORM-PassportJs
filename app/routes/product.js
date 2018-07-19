'use strict'

var productController = require('../controllers/productcontroller');



module.exports = (app)=>{
    app.get('/product',productController.productAll);
    app.get('/product/:kategori',productController.findOneProduct);
    // app.get('/product/detailproduct/:idproduct',isLoggedIn, productController.findOneDetailProduct);
    app.get('/booking/:idproduct', productController.addToChart);
    // app.post('/booking',productController)
    app.get('/bookings',isLoggedIn,productController.beforeBooking);
    app.post('/savebooking',productController.saveBooking)
    app.get('/mybooking',isLoggedIn,productController.findAllBookings)
    app.get('/removeCart/:indexCart',isLoggedIn, productController.removeCart)
    app.get('/product/detailproduct/:idproduct',isLoggedIn, productController.findOneDetailProduct);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}



