const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydata')

const db = mongoose.connection;


db.once('open',(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("db connected successfully!!");
})

module.exports = db;