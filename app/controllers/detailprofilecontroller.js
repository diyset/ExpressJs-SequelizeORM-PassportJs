var exports = module.exports = {}
var moment = require('moment')
var models = require('../models/')
var Sequelize = require('sequelize')

exports.detail = (req,res)=>{
    let profile = req.user;


    console.log(profile.createdAt);
    var date = moment.utc(profile.createdAt,'YYYY-MM-DD HH:MM:SS')
    var tanggalGabung = date.local().format('DD/MM/YYYY')
    console.log('LastLogin ',moment(profile.last_login,"id").utc().format("DD-MM-YYYY hh:mm:ss"));
    console.log(tanggalGabung)
    res.render('profile',{
        'title':'Detail Page',
        profile:profile,
        tanggalGabung:tanggalGabung,
        moment:moment,
        cart:req.session.chart
    })


}


exports.updateFotoProfile = (req,res)=>{
    profile = req.user;
    var path = 'public/images/profile/'+req.files.photoProfile.name
    req.files.photoProfile.mv(path, (err)=>{
        if(err) {
            return res.status(500).send(err);
        }
    let data = {
        img_profile: req.files.photoProfile.name
    }
    console.log(profile.id)
        models.user.update({img_profile:req.files.photoProfile.name},{returning:true,where: {id:profile.id}}).then((results)=>{

        res.redirect('/detailprofile')

    })
    })
}

exports.updateprofile = (req,res)=> {
    let data = {
        img_profile: req.files.photoprofile.name
    }

    models.user.update({img_profile:'anonymous.jpg'},{returning:true,where: {id:profile.id}}).then((results)=>{

        console.log(results)
        console.log('Sukses Update')
        res.redirect('/')
    }).catch((err) => {
        console.log(err.message)
        res.render('Error', {error: err, message: 'Error Catching'})
    })
}
    exports.resetFoto = (req,res)=>{
    let data = {
        img_profile:'anonymous.jpg'
    }
    let profile = req.user;
    models.user.update({img_profile:'anonymous.jpg'},{returning:true,where: {id:profile.id}}).then((results)=>{

            console.log(results)
            console.log('Sukses Update')
            res.redirect('/')
        }).catch((err)=>{
            console.log(err.message)
            res.render('Error',{error:err,message:'Error Catching'})
        })
    }






