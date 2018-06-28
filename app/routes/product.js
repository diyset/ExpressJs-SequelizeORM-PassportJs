'use strict'

var productController = require('../controllers/productcontroller');



module.exports = (app)=>{
    app.get('/product',productController.productAll);
    app.get('/product/:kategori',productController.findOneProduct);
    app.get('/product/detailproduct/:idproduct',isLoggedIn, productController.findOneDetailProduct);
    // app.post('/booking',productController)
    app.get('/booking/:idproduct',isLoggedIn,productController.beforeBooking);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}



