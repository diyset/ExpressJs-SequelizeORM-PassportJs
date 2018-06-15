var exports = module.exports = {}
const models = require('../models/')

exports.findOneProduct=(req,res)=>{
    let data = [
        {kategori:'Wisata Sejarah',id:1},
        {kategori:'Wisata wisata_kuliner',id:2},
        {kategori:'Wisata Edukasi',id:3}
    ]
    let idKategori = req.params.kategori;
    models.tbl_product.findAll({where:{id:idKategori}}).then((results)=>{
        if(results==null){
            res.render('error')
        }
        console.log(results)
        res.render('product',{product:results});
    });

}