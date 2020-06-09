const {cleanHashCache} = require("../services/cache");


module.exports= async (req,res,next)=>{

    await next()  // execute the next middleware then come back to this middleware ;)

    cleanHashCache(req.user.id);
}