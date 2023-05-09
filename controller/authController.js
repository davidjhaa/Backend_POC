const express = require('express');
const userModel = require('../models/userModel');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const {sendMail} = require('../utility/nodemailer')
const { JWT_KEY } = require('../secrets');

// signup function
module.exports.signup = async function signup(req, res){
    try{
        let dataObj = req.body;
        let user =await userModel.create(dataObj);
        sendMail('signup', user);
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
            let user = await userModel.findOne({ email : data.email });
            if(user){
                // bcrypt has modified our password so plz decrypt before comparing
                if(user.password == data.password){
                    let uid = user['_id'];
                    let token = jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token, {httpOnly:true});
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
        else{
            return res.json({
                message:"plz enter ur mail Id",
            });
        }
    } 
    catch(err){
        return res.json({
            message:err.mesage,
        });
    } 
}

// isAuthorised -> to check roles
module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)==true)
            next();
        else{
            res.status(401).json({
                message:'unauthorised access'
            })
        }
    }
}

// protect route
module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.isLoggedIn){
            token = req.cookies.isLoggedIn;
            let payload = jwt.verify(token, JWT_KEY);
            if(payload){
                console.log("payload token", payload);
                const user = await userModel.findById(payload.payload);
                // req.role = user.role;
                req.id = user.id;
                // console.log(req.role, req.id);
                next();
            }
            else{
                return res.json({
                    message:'please login'
                })
            }
        }
        else{
            let client = req.get("User-Agent");
            if(client.includes("mozilla") == true){
                return res.redirect('/login');
            }
            return res.json({
                message:"Operation not allowed"
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message,
        });
    }
}

//forgetPassword
module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
      const user = await userModel.findOne({ email: email });
      if (user) {
        //createResetToken is used to create a new token
        const resetToken = user.createResetToken();
        // http://abc.com/resetpassword/resetToken
        let resetPasswordLink = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;
        //send email to the user
        let obj = {
            resetPasswordLink : resetPasswordLink,
            email : email
        }
        sendMail('resetpassword',obj);
        return res.json({
            message:"",

        })
        //nodemailer
      } 
      else {
        return res.json({
          mesage: "please signup",
        });
      }
    } 
    catch (err) {
      res.status(500).json({
        mesage: err.message,
      });
    }
};

// reset password
module.exports.resetpassword = async function resetpassword(req, res) {
    try {
      const token = req.parmas.token;
      let { password, confirmPassword } = req.body;
      const user = await userModel.findOne({ resetToken: token });
      if (user) {
        //resetPasswordHandler will update user's password in db
        user.resetPasswordHandler(password, confirmPassword);
        await user.save();
        res.json({
          message: "password changed succesfully, please login again",
        });
      } 
      else {
        res.json({
          message: "user not found",
        });
      }
    } 
    catch (err) {
      res.json({
        message: err.message,
      });
    }
};

module.exports.logout = function logout(req,res){
    res.cookies('login', ' ', {maxAge:1});
    res.json({
        message : 'user logged out Succesfully'
    })
}
  
  