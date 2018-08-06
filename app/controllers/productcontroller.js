var exports = module.exports = {}
const models = require('../models/')
let Sequelize = require('sequelize')
let Op = Sequelize.Op;
let uuid4 = require('uuid/v4');
var moment = require('moment')
moment.locale('ID');
var currencyFormatte = require('currency-formatter')
let massageError = "";

exports.productAll = (req,res)=>{
    models.sequelize.query("SELECT * FROM tbl_kategoris",{type: Sequelize.QueryTypes.SELECT}).then((results)=>{
    let user = req.user;
    res.render('productMenu',{
        title:'Product Page',
        profile:user,
        kategori:results,
        cart: req.session.chart
        })
    })
}

exports.findOneProduct=(req,res)=>{
    let profile = req.user;
    let idKategori = req.params.kategori;
    models.sequelize.query(
        "SELECT * FROM tbl_products JOIN tbl_kategoris  ON tbl_products.id_kategori = tbl_kategoris.id_kategori " +
        "where tbl_kategoris.id_kategori = ? ",{
            replacements: [idKategori],
            model: models.tbl_product,
           include:[{
                model: models.tbl_kategori,
            }],
        },{raw:true}
        ).then((results)=>{
        res.render('product',{
            profile:profile,
            title:'Product hasil',
            listProduct:results,
            cart: req.session.chart
        });
    }).catch((err)=>{
        console.log('Error',err)
        res.render('Error',{error:err,message:'Error Catching'})
    });
}

exports.findOneDetailProduct=(req, res, next)=>{
    let idProduct = req.params.idproduct;
    let profile = req.user;
    let date = moment(new Date()).format('YYYY-MM-DDThh:mm');
    let dateMin = moment(new Date()).format('YYYY-MM-DD');
    let dateMinFormat = dateMin+"T00:00";
    if(profile==null){
        res.render('error',{message:'Error pada Params'})
    }

    models.tbl_product.findOne({where:{id_product:idProduct}}).then((results)=>{
        let formatCurrency = currencyFormatte.format(results.harga,{precision:2,symbol:'IDR ',decimal:',',thousand:'.'});
        // console.log('FindOneProduct',results)
        res.render('detailproduct',{
            profile:profile,
            product:results,
            title:'Detail Produk',
            formatCurrency:formatCurrency,
            cart: req.session.chart,
            date:date,
            dateMinFormat:dateMinFormat,
            message:req.flash('message')[0]
        })
    }).catch((err)=>{
        console.log('Error',err)
        res.render('Error',{error:err,message:'Error Catching'});
    })
}

exports.addToChart = (req,res)=>{
    let session = req.session;
    let id_product = req.body.idProduct;
    let tglBooking = req.body.tanggal_booking;

    models.tbl_product.findOne({where:{id_product:id_product}}).then((results)=>{


        const resultsJson = results.toJSON();
        // results.tglBooking = '05/05/1994';
        resultsJson.tglJemput = tglBooking;
        // var tempResults = [results.values];
        // tempResults.tglBooking = '05/12/1994';
        // console.log(tempResults)

        if(tglBooking==null){
           let alertBooking = req.flash('messageBooking','Harap isi Tanggal Booking')
        }
        if(session.chart!=null){
            session.chart.push(resultsJson)
        } else {
            session.chart = [resultsJson];
        }
        let messageCartAlert = req.flash('messageCartAlert','Barang berhasil masuk ke chart')
        res.redirect('/')
        // res.json(req.session.chart)
    }).catch((err)=>{
        console.log("Error", err)
        return render("Error" , {error:err,message:'Error Catching'})
    })

}


exports.beforeBooking=(req,res)=>{
    let profile = req.user
    let idProduct = req.params.idproduct
    var newDate = new Date();
    var dateUser_ = moment.utc(new Date(),'YYYY-MM-DD HH:MM:SS')
    let formateDateUser = dateUser_.local().format('DD/MM/YYYY');
   res.render('detailbooking',{
       cart:req.session.chart,
       profile: profile,
       title:'Pembelian',
       formateDateUser:formateDateUser,
       currencyFormatte:currencyFormatte,
       moment:moment
    })
}

exports.saveBooking=(req,res)=>{
    let profile = req.user;
    let chart = req.session.chart;
    var uuidSubstring = uuid4().substring(1,4);

    chart.forEach((charts)=>{
        var tempHarga = charts.harga+"";

    let data = {
        id_user: profile.id,
        id_product:  charts.id_product,
        lokasi: charts.lokasi,
        kode_booking: tempHarga.substring(0,2)+uuidSubstring+charts.id_product,
        tgl_pemesanan: new Date(),
        tgl_jemput: charts.tglJemput,
        harga: charts.harga,
        nama_wisata: charts.nama_wisata,

    }
    models.tbl_booking.create(data).then((results, created)=>{
        console.log('Sukses Booking : ')
        req.session.chart = [];
        res.redirect('/');

    }).catch((err)=>{
        console.log("Error", err)
        return render("Error" , {error:err,message:'Error Catching'})
    })
    })

}

exports.removeCart = (req,res)=>{
    var chart = req.session.chart;
    var index = req.params.indexCart;
    chart.splice(index,1)
    res.redirect(req.get('referer'));
}
exports.findAllBookings = (req,res)=>{
    let profile = req.user;
    // models.tbl_booking.findAll({where:{id_user:profile.id}}).then((results)=>{
        models.sequelize.query("SELECT * FROM tbl_bookings JOIN tbl_products  ON tbl_bookings.id_product = tbl_products.id_product " +
            "where tbl_bookings.id_user = ? Order BY tgl_pemesanan ASC ",{
                replacements: [profile.id],
                model: models.tbl_booking,
                include:[{
                    model: models.tbl_product,
                }],
            },{raw:true}
        ).then((results)=>{
        var newDate = new Date();
        var date = moment.utc(newDate,'YYYY-MM-DD HH:MM:SS')
        let formateDate = date.local().format('DD/MM/YYYY')
        var dateUser = profile.createdAt;
        var dateUser_ = moment.utc(dateUser,'YYYY-MM-DD HH:MM:SS')
        let formateDateUser = dateUser_.local().format('DD/MM/YYYY');
        var tanggalPemesananDate = results.tgl_pemesanan;
        res.render('listbookings',{
            bookings:results,
            title:'Booking List',
            profile:profile,
            tanggalBaru:formateDate,
            formateDateUser:formateDateUser,
            moment:moment,
            currencyFormatte:currencyFormatte,
            cart:req.session.chart
        })
        // res.render('')
    })
}