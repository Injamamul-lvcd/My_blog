const fs=require('fs')
const userController=require('../controller/UserController')
const auth=require('../middleware/auth')
const validator=require('../middleware/validator')



//set Rotes for User routers
let setRouter=(app)=>{
    app.put('/verify-email',userController.emailVerification)
    app.post('/login',validator.loginValidate,userController.login)
    app.post('/register',validator.registerValidate,userController.register)
    app.get('/show',auth.isAuthorized,userController.show)
    app.post('/forgot-password',userController.forgotPassword)
    app.post('/reset-password',userController.resetPassword)
}

module.exports={
    setRouter:setRouter
}