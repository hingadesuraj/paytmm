const express = require('express');
const app = express();
const cors = require('cors');
const zod = require('zod');
const dotenv = require('dotenv').config();



app.use(express.json());
app.use(cors());



app.get("/",(req,res)=>{
    res.send("Backend is running ");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})


