const express = require('express');
const authorController = require('../controller/authorController');
const authentication= require('../middleware/auth');
const upload=require('../middleware/upload')


//author routes
let setRouter=(app)=>{
    app.get('/author/articles/:id', authentication.isAuthorized, authorController.getArticlesByAuthor);
    app.get('/author/articles/:id', authentication.isAuthorized,authorController.getArticleById );
    app.post('/author/articles',upload.single('photo'), authentication.isAuthorized,authorController.createArticle)
    app.put('/author/articles/:id', authentication.isAuthorized,authentication.isAuthor,authorController.updateArticle);
    app.delete('/author/articles/:id', authentication.isAuthorized,authentication.isAuthor,authorController.deleteArticle);
}

module.exports = {  setRouter:setRouter}
