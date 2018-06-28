'use strict';

let bCrypt = require('bcrypt-nodejs')
let Sequelize = require('sequelize')
let Op = Sequelize.Op;
module.exports = (passport,user)=>{
    
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user,done)=>{
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id).then((user)=>{
            if(user){
                done(null, user.get())
            } else {
                done(user.errors,null)
            }
        })
    })

    passport.use('local-signup', new LocalStrategy(
        {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },

    (req,email,password,done)=>{

        let generateCrypt = (password)=>{
            return bCrypt.hashSync(password,bCrypt.genSaltSync(4),null);
        }

        User.findOne({ where:{ [Op.or]: [{ email: email } , { username: email }]}}).then((user)=>{
            if(user){
                return done(null, false, req.flash('message','Email is Already Taken'))
            }

            else {
                let userPassword = generateCrypt(password)
                let purePassword = req.body.password;
                let data = {
                    email:email,
                    password: userPassword,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    nohp: req.body.nohp
                }
        let confirmPassword = req.body.confirmpassword;

         if(purePassword != confirmPassword){
             console.log(data.password, confirmPassword)
             return done(null, false, req.flash('message','Confirm Password is not valid'))
         }

        User.create(data).then((newUser,created)=>{
            if(!newUser){
                return done(null,false)
            }
            if(newUser){
                return done(null,newUser)
            }
        })
            }
        })
    }
))


passport.use('local-signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
},

    (req, email, password, done, res)=>{
        var date = new Date();
        let createDateAsUTC = (date)=>{
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        }      
        let User = user;
        let isValidPassword = (userpass, password)=>{
            return bCrypt.compareSync(password, userpass)
        }



        User.findOne({ where:{ [Op.or]: [{ email: email } , { username: email }]}}).then((user)=>{
        // User.findOne({where: { email: email}}).then((user)=>{

            if(!user){
                return done(null, false, req.flash('message','Username or Password is not valid'))
            }

            if(!isValidPassword(user.password, password)){
                return done(null, false, req.flash('message','Username or Password is not valid'))
            }
            let data = {
                last_login: createDateAsUTC(date)
            }
            user.update(data).then((newUser,created)=>{
                console.log('newUser',newUser)
            })
            var userinfo = user.get();
            return done(null,userinfo)

        }).catch((err)=>{
            console.log("Error ",err)
            return done(null, false, {message: 'Something went wrong with your signin'})
        })
    }
))
}