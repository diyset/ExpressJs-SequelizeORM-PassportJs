'use strict'
module.exports = function(sequelize, Sequelize){
    var Product = sequelize.define('tbl_product',{
        id: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        nama_wisata: {type: Sequelize.STRING(50),notEmpty:true},
        lokasi: {type: Sequelize.STRING(50),notEmpty:true},
        deskripsi: {type: Sequelize.TEXT},
        url_images: {type: Sequelize.STRING(100),notEmpty:true},
        kode_kategori: {type: Sequelize.INTEGER,notEmpty:true},
        jharga: {type: Sequelize.DOUBLE(10,2)}
    })

    return Product;
}
