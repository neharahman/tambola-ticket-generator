const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const tambulaRoutes = require('./routes/tambulaRoutes.js');
const {connectDb} = require('./database/connect.js');
dotenv.config({path:'./config.env'})

//bodyparser
app.use(bodyParser.urlencoded({extended:'true'}))
app.use(bodyParser.json())

//server
const startServer = (async () =>{
    try{
        //database
        const database=await connectDb()

        //routes
        app.use('/tambola',tambulaRoutes)

        //port
        app.listen(process.env.PORT,()=>{
            console.log('conected to the server')
        })
    }catch(err){
        console.log('Error message :',err)
    }
})()

