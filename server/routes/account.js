const express = require("express");
const authMiddleware = require("../middleware");
const User = require("../models/user");
const Account = require("../models/accountSchema");
const router = express.Router();

// Method: GET  Route: /api/v1/account/balance 

router.get("/balance",authMiddleware, async (req,res)=>{
        // const userId = req.userId
        // console.log(userId) 

      try {
        // const user = await Account.findOne({
        //     _id:userId
        // })
        // console.log(user); // get  

        const account = await Account.findOne({
            userId: req.userId
        });
    
        res.json({
            balance: account.balance
        })

      } catch (error) {
        res.status(411).json({message:"Something went wrong"})
      }
})


module.exports = router;
