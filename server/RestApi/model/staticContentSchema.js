const mongoose = require('mongoose')

const staticSchema =  new mongoose.Schema({
    pageKey:String,
    data:String
},
{timestamps:true}
)

module.exports = mongoose.model('staticContent',staticSchema)