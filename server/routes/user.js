const express = require("express");
const zod = require("zod");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

// get all user
router.get("/alluser",async (req,res)=>{
    try {
        const allUser = await User.find({});
        res.status(200).json({allUser});
    } catch (error) {
        res.status(511).json({message:error.message})
    }
})

// delete user all

router.delete("/deleteall",async (req,res)=>{
    try {
        const allDelete = await User.deleteMany();
        res.status(200).json({message:"all data deleted"})
    } catch (error) {
        res.status(511).json({message:error.message})
    }
})

// zod validation
const signupBody = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

// POST : User create
router.post("/signup", async (req, res) => {
  // parse data in zod validation object using safeParse and then return success or error message
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      msg: "Please enter valid input field",
    });
  }

  //    console.log(req.body)
  // check user exist in db or not using username
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    res.status(411).json({
      msg: "User Exist Please use another email id",
    });
  }

  //    console.log(existingUser);
  //   save to db
  // const userData = new User.create({ // error in these line
  const userData = User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  // after create user then fetch user id ._id;
  const userId = userData._id;

  // create jwt token to verify user token = userId + jwtSecrate
  const token = jwt.sign({ userId }, "surajhingade");
  //    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.status(200).json({
    msg: "User Created...",
    token: token,
  });
});

module.exports = router;
