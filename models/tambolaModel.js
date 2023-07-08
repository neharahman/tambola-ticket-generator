const mongoose = require('mongoose');
const {Schema} =require('mongoose');

const tambolaSchema= new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    tickets:{
        type:Array,
        required:true
    }
})

const tambolaModel = mongoose.model('tambola_tickets',tambolaSchema)
module.exports = tambolaModel