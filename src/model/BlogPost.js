const mongoose = require('mongoose');

Schema=mongoose.Schema;

let articleSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    photo:{
        type:String,
        default:''
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }, 
   approved:
    {
        type:Boolean,
        default:false
    },
   createdAt:{
    type:Date,
    default:Date.now
}
})


const Post=mongoose.model('Article',articleSchema);
module.exports={Post:Post};