const { required } = require('joi')
const mongoose=require('mongoose')
  
    Schema=mongoose.Schema
let userSchema=new Schema({
    name:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    mobile:{
        type:Number,
        default:''
    },
    otp:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin', 'author'],
        default:'author'
    }
})

let Users=mongoose.model('Users',userSchema)

module.exports={
    Users:Users,
}