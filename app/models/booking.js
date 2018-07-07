'use strict'
module.exports = function(sequelize, Sequelize){
    var Booking = sequelize.define('tbl_booking',{
        kode_booking: {primaryKey:true, type:Sequelize.STRING(5)},
        id_product: {type: Sequelize.STRING(50),notEmpty:true},
        id_user: {type: Sequelize.STRING(50),notEmpty:true},
        tgl_pemesanan: {type: Sequelize.DATE},
        harga: {type: Sequelize.DOUBLE(10,2)},
        nama_wisata: {type: Sequelize.STRING(100),allowNull:true},

    })

    return Booking;
}
