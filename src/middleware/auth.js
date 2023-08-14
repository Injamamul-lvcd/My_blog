const responseLib=require('../libs/responseLib')
const token=require('../libs/tokenLib')
const check=require('../libs/checkLib');
const Article=require('..//model/BlogPost')


// Check the user is authenticated or not.
let isAuthorized=async(req,res,next)=>{
    try{
        if(req.header('token')&& !check.isEmpty(req.header('token')))
        {
            let decoded=await token.verifyClaimWithoutSecret(req.header('token'));
            req.user=decoded.data;
            next()
        }
        else{
            let apiResponse=responseLib.generate(true,'Authorization Is Missing in Request',null)
            res.status(403).send(apiResponse)
        }
    }catch(err){
        let apiResponse=responseLib.generate(true,err.message,null)
        res.status(403).send(apiResponse)
    }
}

// Checking for admin access

let isAdmin=async(req,res,next) => {
    if(req.user.role==='admin'){
        next()
    }else{
        let apiResponse=responseLib.generate(false,'You are not authorized to perform this action',null)
        res.status(403).send(apiResponse)
    }
}

// Checking for author access
let isAuthor=(req, res,next) =>{
    const articleId=req.params.id;
    const article = Article.Post.findById(articleId);
    if(article.author==req.user._id) {
        next()
    }else{
        let apiResponse=responseLib.generate(false,'You are not authorized to perform this action',null)
        res.status(403).send(apiResponse)
    }
}

module.exports={
    isAuthorized:isAuthorized,
    isAdmin:isAdmin,
    isAuthor:isAuthor
}