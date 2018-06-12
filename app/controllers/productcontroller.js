var exports = module.exports = {}
const models = require('../models/')

exports.menu = (req,res)=>{
    var profile = req.user;
    models.tbl_product.findAll().then((results)=>{
        if(results==null){
            console.log(results)
            res.render('product',{'title':'Menu Product','profile':profile})
        }
        console.log(results)
        res.render('product',{
            'title':'Menu Product',
            'profile':profile,'product':results,
            'productactive':'active'
        })
    })
        res.render('product',{
            'title':'Menu Product',
            'profile':profile,
            'productactive':'active'
        })

}