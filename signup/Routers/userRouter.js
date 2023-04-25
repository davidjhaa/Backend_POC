const express = require('express');
const cookieParser = require('cookie-parser');
const protectRoute = require('./authHelper');
const {postUser,updateUser,getUsers,getuserById,deleteUser} = require('../controller/userController');
const userRouter = express.Router();


userRouter
    .route('/')
    .get(protectRoute,getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/setCookies")
    .get(setCookies);

userRouter
    .route("/getCookies")
    .get(getCookies);

userRouter
    .route('/:id')
    .get(getuserById)


module.exports=userRouter;