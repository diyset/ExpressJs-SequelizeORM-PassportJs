let createError = require('http-errors');
let express = require('express');
let path = require('path');
let fileupload = require('express-fileupload');
let logger = require('morgan');
let bodyParser = require('body-parser');
let env = require('dotenv').load();
let passport = require('passport');
let session = require('express-session');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let cookieParser = require('cookie-parser');
let ejs = require('ejs');

let app = express();

// For Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());
//For Connect Flash
app.use(flash());
app.use(fileupload())
//For Express Validator
app.use(expressValidator());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');


app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// For Passport
app.use(session({secret:'ilovenodejs', resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

//START Controller
app.get('/about',(req,res)=>{
    let abouts = [
        {name:'Dian Setiyadi',umur:22},
        {name:'Dadang Sudarman',umur:26},
        {name:'Rudi RUdiyanto',umur:20}
    ]
    res.render('/about',{
        abouts:abouts
    })
})

app.get('/testsession',(req,res)=>{
    if(req.session.page_views){
        req.session.page_views++;
        res.send("Jumlah Kunjungan "+req.session.page_views+" kali")
    } else {
        req.session.page_views = 1;
        res.send("Selamat datang di website kami anda baru pertama kali mengunjungi website kami")
    }
})

app.get('/testmap',(req,res)=>{
    res.render('testmap')
})

// app.get('/product',(req,res)=>{
//     res.render('productMenu',{title:'TITLEEE'})
// })
//END Controller

//Models
let models = require('./app/models')


//Routes
let authRoute = require('./app/routes/auth')(app,passport);
let detailProfileRoute = require('./app/routes/detailprofile')(app);
let productRoute = require('./app/routes/product')(app);
let apiRoute = require('./app/routes/ApiRoutes')(app);
let adminRoute = require('./app/routes/AdminRoutes')(app)


require('./app/config/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function(){
   console.log('Berhasil Database di Sync Sequelize!')
 }).catch((err)=>{
   console.log(err,'Ada Yang Error!')
 })




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
