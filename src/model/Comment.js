const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema =new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    content:{
        type:String,
        default:''
    },
    article:
    {
        type:Schema.Types.ObjectId,
        ref:'BlogPost'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const comment=mongoose.model('Comment', commentSchema);
module.exports=comment;