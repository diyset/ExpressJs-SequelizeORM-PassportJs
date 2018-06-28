var exports = module.exports = {}
const models = require('../models/')
let Sequelize = require('sequelize')
let Op = Sequelize.Op;
let uuid4 = require('uuid/v4');
var moment = require('moment')
var currencyFormatte = require('currency-formatter')

exports.productAll = (req,res)=>{
    models.sequelize.query("SELECT * FROM tbl_kategoris",{type: Sequelize.QueryTypes.SELECT}).then((results)=>{
    let user = req.user;
        console.log(results)
    res.render('productMenu',{
        title:'Product Page',
        profile:user,
        kategori:results
        })
    })
}

exports.findOneProduct=(req,res)=>{
    let profile = req.user;
    let idKategori = req.params.kategori;
    models.sequelize.query(
        "SELECT * FROM tbl_products JOIN tbl_kategoris  ON tbl_products.tblKategoriIdKategori = tbl_kategoris.id_kategori " +
        "where tbl_kategoris.id_kategori = ? ",{
            replacements: [idKategori],
            model: models.tbl_product,
           include:[{
                model: models.tbl_kategori,
            }],
        },{raw:true}
        ).then((results)=>{
        console.log(results)
        res.render('product',{profile:profile,title:'Product hasil',listProduct:results});
    }).catch((err)=>{
        console.log('Error',err)
        res.render('Error',{error:err,message:'Error Catching'})
    });
}

exports.findOneDetailProduct=(req, res, next)=>{
    let idProduct = req.params.idproduct;
    let profile = req.user;
    if(profile==null){
        res.render('error',{message:'Error pada Params'})
    }
    models.tbl_product.findOne({where:{id_product:idProduct}}).then((results)=>{

        // if(results==null){
        //     req.next();
        // }
        let formatCurrency = currencyFormatte.format(results.harga,{precision:2,symbol:'IDR ',decimal:',',thousand:'.'});
        console.log('FindOneProduct',results)
        res.render('detailproduct',{profile:profile,product:results,title:'Detail Produk',formatCurrency:formatCurrency})
    }).catch((err)=>{
        console.log('Error',err)
        res.render('Error',{error:err,message:'Error Catching'});
    })
}

exports.beforeBooking=(req,res)=>{
    let profile = req.user
    let idProduct = req.params.idproduct
    var newDate = new Date();


    models.tbl_product.findOne({where:{id_product:idProduct}}).then((results)=>{
        console.log("beforeBooking "+results);

        var uuidSubstring = uuid4().substring(1,4);
        var harga = results.harga.toString();
        var substringHarga = harga.substring(0,1);
        var kodeBooking = substringHarga+uuidSubstring+results.id_product;
        var date = moment.utc(newDate,'YYYY-MM-DD HH:MM:SS')
        var newDateFormat = date.local().format('DD/MM/YYYY')
        console.log(req.body.kodeBooking);
    res.render('detailbooking',{
        profile:profile,
        title:'Booking Detail',
        product:results,
        tanggalOrder: newDateFormat,
        generateKodeBooking:kodeBooking
    })
    }).catch((err)=>{
        console.log('Error',err)
        res.render('Error',{error:err,message:'Error Catching'})
    })
}

exports.saveBooking=(req,res)=>{
    let profile = req.user;

    models.tbl_booking.create(data).then((newUser)=>{

    })
}