const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();


app.use(express.json());
app.listen(3000);

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');
   // base route   route to use
app.use('/user', userRouter);
app.use('/auth', authRouter);


// CRUD OPERATION
// CREATE
// async function postSignup(req, res){
//     let dataObj = req.body;
//     let user =await userModel.create(dataObj);
//     res.json({
//         message : "user signed up",
//         data : user
//     })
// }
// READ
// async function getUsers(req,res){
//     let allUsers = await userModel.find();
//     // let user = await userModel.findOne({name:'Bhawani jha'})
//     res.json({
//         message : "list of all users",
//         data:allUsers
//     });
// }
// UPDATE
// async function updateUser(req,res){
//     let dataToBeUpdated = req.body;
//     let user = await userModel.findOneAndUpdate({email:'Dopa@gmail.com'},dataToBeUpdated);
//     res.json({
//         message : "data updated",
//         data : user
//     })
// };
// DELETE
// async function deleteUser(req,res){
//     let dataToBeDeleted = req.body;
//     let user = await userModel.findOneAndDelete(dataToBeDeleted);
//     res.json({
//         message : "data has been deleted",
//         data : user
//     })
// };

