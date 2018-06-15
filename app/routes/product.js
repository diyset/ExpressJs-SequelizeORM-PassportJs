'use strict'

var productController = require('../controllers/productcontroller');
var wisataController = require('../controllers/wisatacontroller');



module.exports = (app)=>{
    app.get('/product',productController.productAll);

    app.get('/product/:kategori',productController.findOneProduct);
}

