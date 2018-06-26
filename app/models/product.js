'use strict'
module.exports = function(sequelize, Sequelize){
    var Product = sequelize.define('tbl_product',{
        id: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        nama_wisata: {type: Sequelize.STRING(50),notEmpty:true},
        lokasi: {type: Sequelize.STRING(50),notEmpty:true},
        deskripsi: {type: Sequelize.TEXT},
        cover_images: {type: Sequelize.STRING(100),notEmpty:true},
        url_images1: {type: Sequelize.STRING(100),allowNull:true},
        url_images2: {type: Sequelize.STRING(100),allowNull:true},
        url_images3: {type: Sequelize.STRING(100),allowNull:true},
        url_images4: {type: Sequelize.STRING(100),allowNull:true},
        id_kategori: {type: Sequelize.INTEGER,notEmpty:true},
        harga: {type: Sequelize.DOUBLE(10,2)}
    })

    return Product;
}
