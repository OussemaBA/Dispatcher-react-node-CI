// create a user document for jest testing purpose
// we only need mongodb user._id cuz we don't others user model properties
const mongoose =require("mongoose");
const User= mongoose.model("users");

module.exports=()=>{
       return new User({credits:50}).save(); // return a promise


}