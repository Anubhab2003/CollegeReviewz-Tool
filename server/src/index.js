import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./db/db.js"
dotenv.config()

//connect to database
connectDB();

const app=express() ;
const PORT=process.env.PORT || 5000

//middleware
app.use(express.json());


//test route
app.get("/",(req,res)=>{
    res.send("SERVER IS ONLINE");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
