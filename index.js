//express=collection of function (helpers)
// that ease writing servers .we could build it from scratch
const express=require("express");
const app=express();


app.use('/',(req,res)=>{
    res.send("hi: Hello");
})



const PORT=process.env.PORT || 5000;

app.listen(PORT);




