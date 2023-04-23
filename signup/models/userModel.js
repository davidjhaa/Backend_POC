const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const db_link = "mongodb+srv://admin:cFTv92g1gaLcNn1s@cluster0.fzqnue5.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
    // console.log(db);
})
.catch(function(err){
    console.log(err);
})

// schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.password == this.confirmPassword;
        }
    }
});

// pre post hooks
// before save event occurs in db
// userSchema.pre('save',function(){
//     console.log("before saving to db ", this)
// });

// after save event occurs in db
// userSchema.post('save',function(doc){
//     console.log("after saving to db ", doc)
// });

userSchema.pre('save',function(){
    this.confirmPassword=undefined; //THIS line will help to not save confirm password to db
})

// pre hooks 
// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     console.log("hashed password :-> " ,hashedString);
//     this.password = hashedString;
// })


// model
const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;

// (async function createUser(){
//     let user = {
//         name:'jha',
//         email:'vishal@gmail.com',
//         password:'12345678',
//         confirmPassword:'12345678'
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();