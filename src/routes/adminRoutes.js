const express = require('express');
const adminController = require('../controller/adminController');
const auth = require('../middleware/auth')


//admin routes
let setRouter=(app)=>{
    app.get('/admin/articles',auth.isAuthorized,auth.isAdmin,adminController.getAllArticles);
    app.put('/admin/articles/:id/approve',auth.isAuthorized,auth.isAdmin,adminController.approveArticle);
    app.delete('/admin/articles/:id', auth.isAuthorized,auth.isAdmin,adminController.deleteArticle);
}


module.exports ={setRouter:setRouter}
