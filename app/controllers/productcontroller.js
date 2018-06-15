var exports = module.exports = {}
const models = require('../models/')
let Sequelize = require('sequelize')
let Op = Sequelize.Op;

exports.productAll = (req,res)=>{
    let coursels = [
        {namakategori:'Wisata Sejarah',url:'/wisata_sejarah/Museum_kereta/museum_kencana_keraton.jpg',href:1},
        {namakategori:'Wisata Edukasi',url:'/wisata_edukasi/AnakKolongTangga/Anak_kolong_tangga_1.jpg',href:2},
        {namakategori:'Wisata Edukasi',url:'/wisata_kuliner/TheHouseRaminten/the_house_raminten1.jpg',href:3}
    ]
    let user = req.user;
    // models.tbl_kategori.findAll().then((results)=>{
    //
    //     if(results==null){
    //         res.render('error')
    //     }
    //     console.log(results)
    // })
        res.render('productMenu',{title:'Product Page',profile:user,coursels:coursels})
    // res.render('productMenu',{title:'PRODUK PAGE',profile:user,coursels:coursels})

}

exports.findOneProduct=(req,res)=>{
    let data = [
        {kategori:'Wisata Sejarah',id:1},
        {kategori:'Wisata wisata_kuliner',id:2},
        {kategori:'Wisata Edukasi',id:3}
        ]
    let profile = req.user;
    let idKategori = req.params.kategori;
    models.tbl_product.findAll({where:{id:idKategori}}).then((results)=>{
        if(results==null){
            res.render('error')
        }
        console.log(results)
        console.log(profile)
    res.render('product',{profile:profile,product:results,title:'Product Detail'});
    });
    res.render('product',{profile:profile,title:'Product Detail'});

}