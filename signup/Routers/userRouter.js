const express = require('express');
const userModel = require('../models/userModel');
const cookieParser = require('cookie-parser');
const protectRoute = require('./authHelper');
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

async function getUsers(req,res){
    let allUsers = await userModel.find();
    // let user = await userModel.findOne({name:'Bhawani jha'})
    res.json({
        message : "list of all users",
        data:allUsers
    });
}

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message : "data recieved sucessfully",
        user : req.body
    })
};

async function updateUser(req,res){
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({email:'Dopa@gmail.com'},dataToBeUpdated);
    res.json({
        message : "data updated",
        data : user
    })
};

async function deleteUser(req,res){
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message : "data has been deleted",
        data : user
    })
};

function getuserById(req,res){
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    // for(let i = 0; i < users.length; i++){  //it is used for user array object defined earlier at top
    //     if(users[i]['id'] == paramId){
    //         obj = users[i];
    //     }
    // }
    res.json({
        message : "req recieved",
        data : obj
    });
}

//  use 0f cookies npm =>cookie-parser
function setCookies(req,res){
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true});
    res.cookie('isPrimeMember',true);
    res.send('cookie has been set');
}

function getCookies(req,res){
    let cookie = req.cookies;
    console.log(cookie);
    res.send('cookies recieved');
}


module.exports=userRouter;