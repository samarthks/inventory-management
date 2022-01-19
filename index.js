require('dotenv').config()
const express=require("express");
const cors=require('cors');
const app=express();
const PORT=process.env.PORT||8000;

app.get("/",(req,res)=>{
res.send("Hello World");
});


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
});