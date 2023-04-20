const express = require('express');
const mongoose = require('mongoose');

const app = express();
// middleware func->post, front->json
app.use(express.json());
app.listen(3000);

let users = [
    {
        'id':1,
        'name' : "David jhaa"
    },
    {
        'id' : 2,
        'name' : "Jasbir"
    },
    {
        'id' : 3,
        'name' : "iron man"
    }
];

const userRouter = express.Router();
const authRouter = express.Router();
   // base route   route to use
app.use('/user', userRouter);
app.use('/auth', authRouter);

userRouter
    .route('/')
    .get(getUser)
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

function getUser(req,res){
    res.send(users);
}

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message : "data recieved sucessfully",
        user : req.body
    })
};

function updateUser(req,res){
    console.log('req->body', req.body);
    // update data in user obj
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message : "data updated"
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

function middleware1(req, res, next){

}

function middleware2(req, res){
    console.log("middleware 2 encountered");
    next();
    console.log("middleware 2 ended req/res cycle");
    res.sendFile()
}

function getSignup(req, res, next){
    console.log("get signup called");
    next();
    // res.sendFile(__dirname + '/signup/index.html');
}

function postSignup(req, res){
    let dataObj = req.body;
    console.log('backend ', obj);
    res.json({
        message : "user signed up",
        data : obj
    })
}

const db_link = 'mongodb+srv://davidjha732:7JhHM0AmQrPxMvhk@david007.x2tepdn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('db connected');
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
const userModel = mongoose.model('userModal',userSchema);

(async function createUser(){
    let user = {
        name:'jha',
        email:'bhawanijha@gmail.com',
        password:'12345678',
        confirmPassword:'12345678'
    };
    let data = await userModel.create(user);
    console.log(data);
})();