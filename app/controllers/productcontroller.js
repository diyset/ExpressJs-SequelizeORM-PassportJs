var exports = module.exports = {}
const models = require('../models/')
let Sequelize = require('sequelize')
let Op = Sequelize.Op;

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
        "SELECT *, tbl_kategoris.nama_kategori FROM tbl_products JOIN tbl_kategoris  ON tbl_products.id_kategori = tbl_kategoris.id " +
        "where tbl_kategoris.id = ? ",{
            replacements: [idKategori],
            model: models.tbl_product,
            include: [{
                model: models.tbl_kategori
            }]
        }
        ).then((results)=>{
        console.log('Hasil Dari DB',results)
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