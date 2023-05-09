const userModel = require('../models/userModel');

module.exports.getUser=async function getUser(req,res){
    let id = req.params.id;
    let user = await userModel.findById(id);
    // let user = await userModel.findOne({name:'Bhawani jha'})
    if(user){
        return res.json(user);
    }
    else{
        return res.json({
            message:'user not found'
        });
    }
}

module.exports.postUser=function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message : "data recieved sucessfully",
        user : req.body
    })
};

module.exports.updateUser=async function updateUser(req,res){
    try{
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let user = await userModel.findById(id);
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i = 0; i < keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData=await user.save();
        
            res.json({
                message : "data updated",
                data : user
            })
        }
        else{
            res.json({
                message : "user not found"
            })
        }
    }
    catch(err){
        res.json({
            message : err.message,
        });
    }
};

module.exports.deleteUser=async function deleteUser(req,res){
    try{
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:'user not found'
            })
        }
        res.json({
            message : "data has been deleted",
            data : user
        })
    }
    catch(err){
        res.json({
            message : err.message
        })
    }
};

module.exports.getAllUser=async function getAllUser(req,res){
    let users = await userModel.find();  
    if(users){
        res.json({
            message : "users recieved",
            data : users
        });
    }  
    res.json({
        message : "req recieved",
        data : obj
    });
}

module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
      message:'file uploaded succesfully'
    });
  }

//  use 0f cookies npm =>cookie-parser
// function setCookies(req,res){
//     // res.setHeader('Set-Cookie', 'isLoggedIn=true');
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('cookie has been set');
// }

// function getCookies(req,res){
//     let cookie = req.cookies;
//     console.log(cookie);
//     res.send('cookies recieved');
// }
