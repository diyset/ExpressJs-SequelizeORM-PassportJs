var exports = module.exports = {}
const models = require('../models/')
let Sequelize = require('sequelize')
let Op = Sequelize.Op;
let uuid4 = require('uuid/v4');
var moment = require('moment')
var currencyFormatte = require('currency-formatter')
var tempKodeBooking;
var tempNamaWisata;
var tempHarga;
var tempuserId;
var tempProductId;
var tempTblProductIdProduct;

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
        var uuidSubstring = uuid4().substring(1,4);
        var date = moment.utc(newDate,'YYYY-MM-DD HH:MM:SS')
        var newDateFormat = date.local().format('DD/MM/YYYY')
        var harga = results.harga.toString();
        var substringHarga = harga.substring(0,1);
        var kodeBooking = substringHarga+uuidSubstring+results.id_product;
        let formatCurrency = currencyFormatte.format(results.harga,{precision:2,symbol:'IDR ',decimal:',',thousand:'.'});

        tempKodeBooking = kodeBooking;
        tempHarga = results.harga;
        tempNamaWisata = results.nama_wisata;
        tempTblProductIdProduct = results.id_product;
        tempuserId = profile.id;
        console.log("beforeBooking "+results);

        console.log(tempKodeBooking);
    res.render('detailbooking',{
        profile:profile,
        title:'Booking Detail',
        product:results,
        tanggalOrder: newDateFormat,
        generateKodeBooking:kodeBooking,
        formatCurrency:formatCurrency
    })
    }).catch((err)=>{
        console.log('Error',err)
        res.render('Error',{error:err,message:'Error Catching'})
    })
}

exports.saveBooking=(req,res)=>{
    let profile = req.user;
    let data = {
        id_user: profile.id,
        id_product:  tempTblProductIdProduct,
        kode_booking: tempKodeBooking,
        tgl_pemesanan: new Date(),
        harga: tempHarga,
        nama_wisata: tempNamaWisata,
        userId: tempuserId,
        tblProductIdProduct: tempTblProductIdProduct
    }
    console.log(data)
    models.tbl_booking.create(data).then((results)=>{
        console.log(results)
    res.redirect('/');
    }).catch((err)=>{
        console.log('Error'+err)
        res.render('Error',{error:err,message:'Error Catching'})
    })
    // models.tbl_booking.create(data).then((newUser)=>{
    //
    // })
}
exports.findAllBookings = (req,res)=>{
    let profile = req.user;
    models.tbl_booking.findAll({where:{id_user:profile.id}}).then((results)=>{
        console.log(results)
        var newDate = new Date();
        var date = moment.utc(newDate,'YYYY-MM-DD HH:MM:SS')
        let formateDate = date.local().format('DD/MM/YYYY')
        var dateUser = profile.createdAt;
        console.log(dateUser)
        var dateUser_ = moment.utc(dateUser,'YYYY-MM-DD HH:MM:SS')
        let formateDateUser = dateUser_.local().format('DD/MM/YYYY');
        var tanggalPemesananDate = results.tgl_pemesanan;
        var tglPemsananDate = moment.utc(tanggalPemesananDate, 'YYYY-MM-DD HH:MM:SS')
        var formatTglPemesanan =
        res.render('listbookings',{
            bookings:results,
            title:'Booking List',
            profile:profile,
            tanggalBaru:formateDate,
            formateDateUser:formateDateUser,
            moment:moment,
            currencyFormatte:currencyFormatte
        })
        // res.render('')
    })
}