var exports = module.exports = {}

exports.detail = (req,res)=>{
    let profile = req.user;

    res.render('profile',{'title':'Detail Page',profile:profile})
}



