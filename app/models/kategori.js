'use strict'
module.exports = function(sequelize, Sequelize){
    var Kategori = sequelize.define('tbl_kategori',{
        id: {primaryKey:true, type:Sequelize.INTEGER},
        nama_kategori:{type: Sequelize.STRING(50)}
    })

    return Kategori;
}
