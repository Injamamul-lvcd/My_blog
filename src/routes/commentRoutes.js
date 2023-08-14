const express=require('express');
const commentController=require('../controller/commentController')
const authentication= require('../middleware/auth');


//Rotes for the comments
let setRouter=(app)=>{
    app.post('/author/articles/:id/comments',authentication.isAuthorized,commentController.createComment);
    app.get('/author/articles/:id/comments',authentication.isAuthorized,commentController.getCommentsByArticle);
    app.put('/author/articles/:id/comments', authentication.isAuthorized,authentication.isAuthor,commentController.updateComment);
    app.delete('/author/articles/:id/comments/:id', authentication.isAuthorized,authentication.isAuthor,commentController.deleteComment);
}


module.exports={setRouter:setRouter};