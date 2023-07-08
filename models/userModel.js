const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const userSchema =new Schema({
    name:{
        type:String
    },
    mobile:{
        type:Number,
        maxlength:10
    },
    password:{
        type:String
    }
})

const userModel = mongoose.model('user',userSchema)
module.exports=userModel