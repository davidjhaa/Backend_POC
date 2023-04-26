const express = require('express');
const userModel = require('../models/userModel');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

// signup function
module.exports.signup = async function signup(req, res){
    try{
        let dataObj = req.body;
        let user =await userModel.create(dataObj);
        if(user){
            return res.json({
                message : "user signed up",
                data : user
            })
        }
        else{
            res.json({
                message : "err on signup"
            })
        }
    }
    catch(err){
        res.json({
            message : err.message
        })
    }
}

// login check function
module.exports.login = async function login(req,res){
    try{
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            if(user){
                // bcrypt has modified our password so plz decrypt before comparing
                if(user.password == data.password){
                    let uid = user['_id'];
                    let token = jwt.sign({})
                    res.cookie('isLoggedIn',true, {httpOnly:true});
                    return res.json({
                        message:"logged in successfully",
                        userDetails:data
                    });
                }
                else{
                    return res.json({
                        message:"wrong credentials",
                    });
                }
            }
            else{
                return res.json({
                    message:"user not found",
                });
            }
        }
    } 
    catch(err){
        return res.json({
            message:"catch error"
        });
    } 
}

// isAuthorised -> to check roles
module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.include(req.role)==true)
            next();
        else{
            res.status(401).json({
                message:'unauthorised access'
            })
        }
    }
}

// protect route
function protectRoute(req,res,next){
    try{
        if(req.cookies.isLoggedIn){
            let isVerified = jwt.verify(req.cookies.isLoggedIn, JWT_KWEY);
            if(isVerified){
                next();
            }
            else{
                return res.json({
                    message:'user not verified'
                })
            }
        }
        else{
            return res.json({
                message:"Operation not allowed"
            });
        }
    }
    catch(err){
        return res.json({
            message:"Operation not allowed 2"
        });
    }
}