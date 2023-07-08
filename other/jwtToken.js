const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path:'.././config.env'})
const secret_key=`${process.env.SECRET_KEY}`

module.exports.createToken=async (id)=>{
    let token=await jwt.sign({id},secret_key,{expiresIn:'1d'})
    return token
}

module.exports.verifyToken=async (id)=>{
  try {
    let decoded=await jwt.verify(id,secret_key)
    console.log('token verify successfully')
    return decoded
  } catch(err) {
    console.log('something went wrong during token verify',err)
  }
}