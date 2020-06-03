const mongoose=require("mongoose");
const {Schema}=mongoose;
const recipientSchema=require("./recipient");
//we only needs to require our model in one file


const surveySchema = new Schema({
    title:String,
    body:String,
    subject:String,
    recipients:[recipientSchema],
    yes:{type:Number, default: 0},
    no:{type:Number, default: 0},
    _user:{type:Schema.Types.ObjectId,ref:'User'}, // mch normalent "Users" ? why name of the file
    dateSent:Date,
    lastResponded:Date

});


mongoose.model("surveys",surveySchema);