const express = require('express');

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
   // base route   route to use
app.use('/user', userRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getuserById)

// GET METHOD
// app.get('/user')

// POST METHOD
// app.post('/user')

// UPDATE METHOD ->patch
// app.patch('/user')

// DELETE METHOD
// app.delete('/user')

// parameters
app.get('/user/:id', (req,res)=>{
    console.log(req.params.id);
    res.send("user id recieved");   
})

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