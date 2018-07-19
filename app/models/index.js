'use strict'

let fs = require('fs')
let path = require('path')
let Sequelize = require('sequelize')
let env = process.env.NODE_ENV || "development"
let config = require(path.join(__dirname, '..','config','config-sequelize.json'))[env]
let sequelize = new Sequelize(config.database, config.username, config.password, config)
let db = {};

fs
    .readdirSync(__dirname)
    .filter((file)=>{
        return (file.indexOf(".")!== 0) && (file !== "index.js")
    })
    .forEach((file)=>{
        let model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model;
    })

    Object.keys(db).forEach((modelName)=>{
        if ("associate" in db[modelName]){
            db[modelName].associate(db)
        }
    })

    db.sequelize = sequelize
    db.Sequelize = Sequelize

db.product = require('../models/product')(sequelize,Sequelize)
db.kategori = require('../models/kategori')(sequelize,Sequelize)
db.user = require('../models/user')(sequelize,Sequelize)
db.booking = require('../models/booking')(sequelize,Sequelize)

// db.booking.belongsTo(db.user)
// db.booking.hasMany(db.user)
// db.booking.belongsTo(db.product)
// db.kategori.belongsTo(db.product,{through:'productProject'})
// db.kategori.hasMany(db.product)

    module.exports = db;