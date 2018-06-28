module.exports = function(sequelize, Sequelize) {
    var Kategori = sequelize.define('tbl_kategori', {
        id_kategori: {primaryKey: true, type: Sequelize.INTEGER},
        nama_kategori: {type: Sequelize.STRING(50)},
        url_images: {type: Sequelize.STRING(100)},
        deskripsi: {type: Sequelize.TEXT}

    })
    return Kategori

}