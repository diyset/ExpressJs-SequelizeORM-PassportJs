var exports = module.exports = {}


exports.signup = function(req,res){
	res.render('signupv2',{
	  'title':'Signup Page',
        'message': req.flash('message')[0],
        'signupactive':'active'
	});
}

exports.signin = function(req,res){
	res.render('login',{
	  'title':'Login Page',
        'message': req.flash('message')[0]
	});
}

exports.menu = function(req,res){
  let profile = req.user;
  console.log('Menu : ',profile)
  res.render('index',{
    'profile': profile,
      'title':'Menu Page',
      'product':'/product',
      'menuactive':'active'
  });
}



exports.login = (req,res)=>{
  let message = req.message;
  console.log('Message ',message)
  res.render('login',{'message': message})
}

exports.signupv2 = (req,res)=>{
  let profile= req.user;
  res.render('signup',{'profile':profile,'title':'Signup Page','message':req.flash('message')[0],'active':'active'})
}

exports.logout = function(req,res){

  req.session.destroy((err)=>{
    console.log('LOGOUT ERROR',err)
  })
  res.redirect('/index');
}