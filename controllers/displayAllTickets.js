const {verifyToken} = require('../other/jwtToken.js');
const tambolaModel = require('../models/tambolaModel.js');
module.exports.displayAllTickets = async (req,res) =>{
    try{
        let {authorization} = req.headers
        const {limit=6,page=0} =req.query
        let jwt =await verifyToken(authorization)
        console.log(jwt)
        if(jwt.id){
            let tickets = await tambolaModel.find({user_id:jwt.id}).skip(limit*page).limit(limit).select('tickets name')
            res.status(200).json({
                status:'success',
                message:'All tickets',
                tickets,
                limit,
                currentPage:page

            })
        }
        else{
            res.status(401).json({
                status:'unauthorized',
                message:'please login to continue'
            })
        }
    }catch(err){
        res.status(404).json({
            status:'failure',
            message:'data not found',
            err
        })
    }
}