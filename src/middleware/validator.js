
const responseLib=require('../libs/responseLib')

const Joi=require('joi').extend(require('@joi/date'))


const customLoginValidSchema=Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().max(20).required()
})
const customRegisterValidateSchema=Joi.object({
    name:Joi.string().required(),
    password:Joi.string().required(),
    email:Joi.string().email().required(),
    mobile:Joi.string().length(10).required()
})


let loginValidate=async(req,res,next)=>{
    try{
        const value=await customLoginValidSchema.validate(req.body)
        if(value.hasOwnProperty('error'))
        {
            throw new Error(value.error)
        }else{
            next()
        }
    }catch(err){
        let apiResponse=responseLib.generate(true,err.message,null)
        res.status(400).send(apiResponse)
    }
}

let registerValidate=async(req,res,next)=>{
    try{
        const value=await customRegisterValidateSchema.validate(req.body)
        if(value.hasOwnProperty('error')){
            throw new Error(value.error)
        }
        else{
            next()
        }
    }catch(err){
        let apiResponse=responseLib.generate(true,err.message,null)
        res.status(400).send(apiResponse)
    }
}

module.exports={
    loginValidate:loginValidate,
    registerValidate:registerValidate
}