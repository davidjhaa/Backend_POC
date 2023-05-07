const express = require('express');
const cookieParser = require('cookie-parser');
const {getUser,postUser,updateUser,deleteUser,getAllUser} = require('../controller/userController');
const {signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword,logout} = require('../controller/authController');
const userRouter = express.Router();


// user's options
userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/signup')
    .post(signup)

userRouter
    .route('/login')
    .post(login)

// profile page
// userRouter.use(protectRoute);
userRouter
    .route('/userProfile')
    .get(protectRoute, getUser)

// admin specific function
// userRouter.use(isAuthorised(['admin']));
userRouter
    .route('/')
    .get(isAuthorised(['admin']), getAllUser)

userRouter
    .route('/forgetpassword')
    .post(forgetpassword)

userRouter
    .route('/resetpassword')
    .post(resetpassword)

userRouter
    .route('/logout')
    .get(logout)


// userRouter
//     .route("/setCookies")
//     .get(setCookies);

// userRouter
//     .route("/getCookies")
//     .get(getCookies);


module.exports=userRouter;