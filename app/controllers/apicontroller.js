var exports = module.exports = {}
var models = require('../models/')
let Sequelize = require('sequelize')


exports.findDetailUser = (req, res)=>{
    let profile = req.user;

    let data = {
        profile:profile,
    }
    res.send({data:data})
}

exports.findAllProduct = (req,res)=>{
    models.tbl_product.findAll().then((results)=>{
        res.send({data:results})
    })
}
exports.findProductByKategori = (req,res)=>{
    let idKategori = req.params.idKategori;
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
        res.send({data:results})
    })
}
exports.findAllBooking = (req,res)=>{
    models.booking.findAll().then((results)=>{
        res.send({data:results})
    })
}
exports.findAllBookingByUser = (req,res)=>{
    let profile = req.user;
    models.booking.findAll({where:{id_user:profile.id}}).then((results)=>{
        res.send({data:results})
    })
}