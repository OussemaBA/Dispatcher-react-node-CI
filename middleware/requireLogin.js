module.exports = (req,res,next)=>{
        if(!req.user){
            res.status(401).send({error:"You have to be logged in"});
            //401 :Unauthorized
        }
        next();
}

