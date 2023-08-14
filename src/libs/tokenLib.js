const express = require('express')
const jwt=require('jsonwebtoken')
const shortid=require('shortid')
const secretKey=process.env.ENC_KEY


let generateToken=async(data)=>{
    try{
        let claims = {
            jwtid:shortid.generate(),
            iat:Date.now(),
            exp:Math.floor(Data.now()/1000)+(120*120),
            sub:'auth_token',
            data:data
        }
        return await jwt.sign(claims,secretKey);

    }catch(err){
        throw err;
    }
}
let resetToken=()=>{
    return new Promise((resolve,reject)=>{
            try{
                let claims={
                    jwtid:shortid.generate(),
                    iat:Date.now(),
                    sub:'passwordReset_token',
                    data:''
                 }
            resolve(jwt.sign(claims,secretKey));
            }catch(err){
            reject(err)
            }
        })
};

let verifyClaim = (token,secret,cb) => {
    // verify a token symmetric
    jwt.verify(token, secret,function(err,decoded){
        if(err){
            cb(err,null)
        }else{
            cb(null,decoded)
        }
    })
  }
  // end verify claim 

let verifyClaimWithoutSecret=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, secretKey, function(err,decoded){
            if(err){
                reject(err)
            }
            else{
                resolve(decoded)
            }
        })
    })
}

module.exports={
    generateToken:generateToken,
    resetToken:resetToken,
    verifyClaim:verifyClaim,
    verifyClaimWithoutSecret:verifyClaimWithoutSecret
}