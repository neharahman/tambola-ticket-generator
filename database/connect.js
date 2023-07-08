const mongoose = require('mongoose');
const dotenv = require('dotenv');


module.exports.connectDb=async()=>{
    console.log('inside db connection')
    const db=process.env.DATABASE.replace('<password>',process.env.PASSWORD).replace('<username>',process.env.USER_NAME)
    mongoose.connect(db).then(()=>console.log('database connected')).catch(err=>console.log(err))
}
