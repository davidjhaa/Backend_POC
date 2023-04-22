const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const userModel = require('./models/userModel');
const express = require('express');
const app = express();

// middleware func->post, front->json
app.use(express.json());
app.listen(3000);

// let users = [
//     {
//         'id':1,
//         'name' : "David jhaa"
//     },
//     {
//         'id' : 2,
//         'name' : "Jasbir"
//     },
//     {
//         'id' : 3,
//         'name' : "iron man"
//     }
// ];

const userRouter = express.Router();
const authRouter = express.Router();
   // base route   route to use
app.use('/user', userRouter);
app.use('/auth', authRouter);

userRouter
    .route('/')
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getuserById)


authRouter
    .route('/signup')
    .get(getSignup)
    .post(postSignup)


// CRUD OPERATION
// CREATE
async function postSignup(req, res){
    let dataObj = req.body;
    let user =await userModel.create(dataObj);
    res.json({
        message : "user signed up",
        data : user
    })
}
// READ
async function getUsers(req,res){
    let allUsers = await userModel.find();
    // let user = await userModel.findOne({name:'Bhawani jha'})
    res.json({
        message : "list of all users",
        data:allUsers
    });
}
// UPDATE
async function updateUser(req,res){
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({email:'Dopa@gmail.com'},dataToBeUpdated);
    res.json({
        message : "data updated",
        data : user
    })
};
// DELETE
async function deleteUser(req,res){
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message : "data has been deleted",
        data : user
    })
};


function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message : "data recieved sucessfully",
        user : req.body
    })
};

function getuserById(req,res){
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    for(let i = 0; i < users.length; i++){
        if(users[i]['id'] == paramId){
            obj = users[i];
        }
    }
    res.json({
        message : "req recieved",
        data : obj
    });
}

// function middleware1(req, res, next){
//     console.log('middleware1 encountered');
//     next();
// }

// function middleware2(req, res){
//     console.log("middleware 2 encountered");
//     next();
//     console.log("middleware 2 ended req/res cycle");
// }

function getSignup(req, res){
    console.log("get signup called");
    // next();
    // res.sendFile(__dirname + '/signup/index.html');
}