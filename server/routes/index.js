const express = require('express');
const userRouter = require("../routes/user")
const router = express.Router();



// all router import heare 
router.use("/user",userRouter)

module.exports = router; 