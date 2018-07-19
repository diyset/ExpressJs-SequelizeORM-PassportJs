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
  let coverCarousel = [
      {namawisata:'Wisata Edukasi',url:'/wisata_edukasi/AnakKolongTangga/Anak_kolong_tangga_1.jpg',href:1},
      {namawisata:'Wisata Sejarah',url:'/wisata_sejarah/Museum_kereta/museum_kencana_keraton.jpg',href:2},
      {namawisata:'Wisata wisata_kuliner',url:'/wisata_kuliner/TheHouseRaminten/the_house_raminten1.jpg',href:3}
  ];
  console.log('Menu : ',profile)
    console.log('Cart : ',req.session.chart)
  res.render('index',{
    'profile': profile,
      'title':'Menu Page',
      'product':'/product',
      coverCarousel:coverCarousel,
      cart: req.session.chart
  });
}



exports.login = (req,res)=>{
  let message = req.message;
  console.log('Message ',message)
  res.render('login',{'message': message})
}

exports.signupv2 = (req,res)=>{
  let profile= req.user;
  res.render('signup',{'profile':profile,'title':'Signup Page','message':req.flash('message')[0],'active':'active',cart:req.session.chart})
}

exports.logout = function(req,res){

  req.session.destroy((err)=>{
    console.log('LOGOUT ERROR',err)
  })
  res.redirect('/index');
}