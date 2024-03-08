const express = require("express");
const authMiddleware = require("../middleware");
const User = require("../models/user");
const Account = require("../models/accountSchema");
const router = express.Router();

// Method: GET  Route: /api/v1/account/balance

router.get("/balance", authMiddleware, async (req, res) => {
  // const userId = req.userId
  // console.log(userId)

  try {
    // const user = await Account.findOne({
    //     _id:userId
    // })
    // console.log(user); // get

    const account = await Account.findOne({
      userId: req.userId,
    });

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    res.status(411).json({ message: "Something went wrong" });
  }
});

// Method: POST  Route: /api/v1/account/transfer
router.post("/transfer", authMiddleware, async (req, res) => {
  const { to, amount } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });

  // check account balance
  if (account.balance < amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  // send karaycha userId
  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // update account send karanaryach account
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  // send kel tych acount update karne new balance sobat
  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  try{

    res.status(200).json({
      message: "Transfer successful",
    });
  }catch(error){
    console.log(error.message)
  }
});

/* good solution
  
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


*/

module.exports = router;
