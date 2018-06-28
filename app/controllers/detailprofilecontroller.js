var exports = module.exports = {}
var moment = require('moment')
exports.detail = (req,res)=>{
    let profile = req.user;
    console.log(profile.createdAt);
    var date = moment.utc(profile.createdAt,'YYYY-MM-DD HH:MM:SS')
    var tanggalGabung = date.local().format('DD/MM/YYYY')
    console.log(tanggalGabung)
    res.render('profile',{
        'title':'Detail Page',
        profile:profile,
        tanggalGabung:tanggalGabung
    })
}



