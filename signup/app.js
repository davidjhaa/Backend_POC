const express = require('express');
const mongoose = require('mongoose');
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

async function getUsers(req,res){
    // let allUsers = await userModel.find();
    let user = await userModel.findOne({name:'Bhawani jha'})
    res.json({
        message : "list of all users",
        data:user
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
    let user = await userModel.findOneAndUpdate({email:'vishal@gmail.com'},dataToBeUpdated);
    res.json({
        message : "data updated",
        data : user
    })
};

function deleteUser(req,res){
    users={};
    res.json({
        message : "data has been deleted"
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

async function postSignup(req, res){
    let dataObj = req.body;
    let user =await userModel.create(dataObj);
    res.json({
        message : "user signed up",
        data : user
    })
}

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
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }
});

// model
const userModel = mongoose.model('userModel',userSchema);

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