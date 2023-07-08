const userModel = require('../models/userModel.js');
const {createToken} = require('../other/jwtToken.js');
const {createHashPassword,comparePassword} =require('../other/hashPassword.js')

module.exports.signup = async (req,res)=>{
    try{
        const {name,mobile,password}=req.body
        console.log('inside signup')

        let hashPassword = await createHashPassword(password)
        let isUserAlreadyExist= await userModel.findOne({mobile:mobile})
        
        let userSignup = new userModel({
            name,mobile,password:hashPassword
        })

        if(!isUserAlreadyExist)
        {
            let userSignup_save = await userSignup.save()
            console.log(userSignup_save)
            let jwt = await createToken(userSignup_save._id)

            res.status(200).json({
                status:'success',
                message:'signup successfull',
                user:userSignup,
                token:jwt
            })
        }
        else{
            let compareHashPassword =await comparePassword(password,isUserAlreadyExist.password)
            
            if(isUserAlreadyExist && compareHashPassword ){
                let jwt = await createToken(isUserAlreadyExist._id)
                res.status(200).json({
                    status:'success',
                    message:'login successfull',
                    token:jwt
                })
            }
            else{
                res.status(401).json({
                    status:'unauthorized',
                    message:'invalid mobile or password'
                })
            }
        }
    }catch(err){
       
        console.log('inside login',err)
        res.status(404).json({
            status:'failure',
            message:'something went wrong please try after some time',
            error:err
        })
    }
}
module.exports.login =async (req,res)=>{
    try{
        const {mobile,password}=req.body
        console.log('inside login')

        let isMobileExist = await userModel.findOne({mobile})
        if(isMobileExist){    
            let compareHashPassword =await comparePassword(password,isMobileExist.password)
            if(compareHashPassword){
                let jwt = await createToken(isMobileExist._id)
                res.status(200).json({
                    status:'success',
                    message:'succefully login',
                    token:jwt
                })
            }
            else{
                res.status(401).json({
                    status:'failure',
                    message:'please check mobile number or password'
                })
            }
        }
        else{
            res.status(401).json({
                status:'failure',
                message:'user not found please signup'
            })
        }
    }catch(err){
        console.log('inside login',err)
        res.status(404).json({
            status:'failure',
            message:'something went wrong please try after some time',
            error:err
        })
    }
}
