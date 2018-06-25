var exports = module.exports = {}
const models = require('../models/')
let Sequelize = require('sequelize')
let Op = Sequelize.Op;

exports.productAll = (req,res)=>{
    let coursels = [
        {namakategori:'Wisata Sejarah',url:'/wisata_sejarah/Museum_kereta/museum_kencana_keraton.jpg',href:'WisataSejarah'},
        {namakategori:'Wisata Edukasi',url:'/wisata_edukasi/AnakKolongTangga/Anak_kolong_tangga_1.jpg',href:'WisataEdukasi'},
        {namakategori:'Wisata Edukasi',url:'/wisata_kuliner/TheHouseRaminten/the_house_raminten1.jpg',href:'WisataKuliner'}
    ]
    let user = req.user;
    res.render('productMenu',{title:'Product Page',profile:user,coursels:coursels})
}

exports.findOneProduct=(req,res,next)=>{
    let profile = req.user;
    let namaKategori = req.params.kategori;
    let hasil = [];
    models.tbl_product.findAll({where:{nama_kategori:namaKategori}}).then((results)=>{
        // if(err){
        //     res.render('error')
        // }
        // if(err){
        //     res.render('error',{message:'ERROR PRODUCT'})
        // }
        console.log('Hasil Dari DB',results)
        console.log(profile)
        hasil = results;
        // res.send({data:results})
        console.log('Hasil',hasil)
        res.render('product',{profile:profile,title:'Product hasil',listProduct:hasil});
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
    models.tbl_product.findOne({where:{id:idProduct}}).then((results)=>{


        if(results==null){
            req.next();
        }
        console.log('FindOneProduct',results)
        res.render('detailproduct',{profile:profile,product:results,title:'Detail Produk'})
    }).catch((err)=>{
        console.log('Error',err)
        res.render('Error',{error:err,message:'Error Catching'});
    })
}