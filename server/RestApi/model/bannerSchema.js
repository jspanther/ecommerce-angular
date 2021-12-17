const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    bannerImage:String
},
{timestamps:true}
)

module.exports = mongoose.model("banner", bannerSchema);
