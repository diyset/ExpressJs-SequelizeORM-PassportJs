'use strict'
module.exports = function(sequelize, Sequelize){
    var Kategori = sequelize.define('tbl_kategori',{
        kode_kategori: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        nama_kategori: {type: Sequelize.STRING(50),notEmpty:true}
    })

    return Kategori;
}
