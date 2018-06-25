'use strict'
module.exports = function(sequelize, Sequelize){
    var Booking = sequelize.define('tbl_booking',{
        kode_booking: {autoIncrement:true, primaryKey:true, type:Sequelize.INTEGER},
        id_product: {type: Sequelize.STRING(50),notEmpty:true},
        id_user: {type: Sequelize.STRING(50),notEmpty:true},
        tgl_pemesanan: {type: Sequelize.DATE}

    })

    return Booking;
}
