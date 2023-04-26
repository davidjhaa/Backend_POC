const express = require('express');
const cookieParser = require('cookie-parser');
const protectRoute = require('./authHelper');
const {postUser,updateUser,getUsers,getuserById,deleteUser} = require('../controller/userController');
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
app.use(protectRoute);
userRouter
    .route('/userProfile')
    .get(getUser)

// admin specific function
app.use(isAuthorised(['admin']));
userRouter
    .route('/')
    .get(getAllUser)



// userRouter
//     .route("/setCookies")
//     .get(setCookies);

// userRouter
//     .route("/getCookies")
//     .get(getCookies);


module.exports=userRouter;