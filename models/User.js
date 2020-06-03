const mongoose =require("mongoose");
const {Schema}=mongoose;

const userSchema = new Schema({
        googleId:String,
        credits:{type:Number, default:0}
});

mongoose.model('users',userSchema);

//we create a user s collection  online in our mongoodb data base
//that contain several instance of userSchema
//require("./models/User"); --> we define a table named User ** this is what i understood**