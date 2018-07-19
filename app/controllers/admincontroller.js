'use strict'
var exports = module.exports = {}

const models  = require("../models/")
let Sequelize = require('sequelize')
let bCrypt = require('bcrypt-nodejs')
let Op = Sequelize.Op;


exports.index = (req, res) =>{
    let profile = req.user;
res.render('admin/index',{profile:profile})
}


