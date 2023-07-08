const bcrypt = require('bcrypt');
const dotenv = require('dotenv');


module.exports.createHashPassword=async function(password){
    const hashPassword=await bcrypt.hash(password,14)
    return hashPassword
}

module.exports.comparePassword=async function(password,hash){
    
    let compare1=await bcrypt.compare(password,hash)
    console.log('inside compareHashPasswordFun')
    return compare1
}