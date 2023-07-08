const Joi = require('joi');

module.exports.SignupSchemaJoi = async (req,res,next)=>{
   try{
    console.log('inside SignupSchemaJoi')
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        mobile: Joi.number()
            //.pattern(new Reg('^[0-9]{10}$'))
            //.length(10)

    })
    console.log(req.body)
    await schema.validateAsync(req.body);
    console.log('data validated')
    next()
   }catch(err){
    res.status(404).json({
        status:'failure',
        message:'validation error',
        error:err
    })
   }
}

module.exports.LoginJoi = async (req,res,next)=>{
    try{
     console.log('inside LoginJoi')
     const schema = Joi.object({
         password: Joi.string()
             .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
         mobile: Joi.number()
             // .pattern(new Reg('[0-9]{10}'))
 
     })
     console.log(req.body)
     await schema.validateAsync(req.body);
     console.log('data validated')
     next()
    }catch(err){
     res.status(404).json({
         status:'failure',
         message:'please enter valid numbers or password',
         error:err
     })
    }
 }

 module.exports.createticketJoi = async (req,res,next)=>{
    try{
     console.log('inside createticketJoi')
     const schema = Joi.object({
        //  password: Joi.string()
        //      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        //  mobile: Joi.number()
        //      // .pattern(new Reg('[0-9]{10}'))
        NumbersOfTickets: Joi.number()
 
     })
     console.log(req.body)
     await schema.validateAsync(req.body);
     console.log('data validated')
     next()
    }catch(err){
     res.status(404).json({
         status:'failure',
         message:'please enter number only',
         error:err
     })
    }
 }