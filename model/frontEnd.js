const http = require("http")
const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    make:{
        type:String
    },
    model:{
        type:String
    },
    year:{
        type: Number
    },
    img:{
        type:File   }
})

const user = mongoose.model('cars', userSchema)
module.exports = user