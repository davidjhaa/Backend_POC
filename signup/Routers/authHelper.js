// let flag = false;
function protectRoute(req,res,next){
    try{
    if(req.cookies.isLoggedIn){
        next();
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

module.exports=protectRoute;