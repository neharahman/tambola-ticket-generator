const express = require('express');
const route = express.Router();
const {signup,login} = require('../controllers/user.js')
const {createTambolaTicket} = require('../controllers/create_ticket.js')
const {displayAllTickets} = require('../controllers/displayAllTickets.js')
const {SignupSchemaJoi,LoginJoi,createticketJoi} = require('../dataValidation.js')
route.get('/',(req,res)=>{
    res.send('hello tambula')
})

route.post('/user/signup',SignupSchemaJoi,signup)
route.post('/user/login',LoginJoi,login)
route.post('/create-ticket',createticketJoi,createTambolaTicket)
route.get('/tickets',displayAllTickets)


module.exports=route