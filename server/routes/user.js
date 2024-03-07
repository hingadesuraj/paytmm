const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");
const User = require("../models/user");
const Account = require("../models/accountSchema");
const router = express.Router();

// get all user
router.get("/alluser", async (req, res) => {
  try {
    const allUser = await User.find(); 
    res.status(200).json({ allUser });
  } catch (error) {
    res.status(511).json({ message: error.message });
  }
});

// delete user all 
router.delete("/deleteall", async (req, res) => {
  try {
    const allDelete = await User.deleteMany();
    res.status(200).json({ message: "all data deleted" });
  } catch (error) {
    res.status(511).json({ message: error.message });
  }
});

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
  const userData = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  // after create user then fetch user id ._id;
  const userId = userData._id;
  // console.log({userId})

  	/// ----- Create new account ------ and give some dummy money
    await Account.create({   
      userId,
      balance: 1 + Math.random() * 10000
  })

  /// -----  ------

  // create jwt token to verify user token = userId + jwtSecrate
  const token = jwt.sign({ userId }, "surajhingade");
  //    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.status(200).json({
    msg: "User Created...",
    token: token,
  });
});

// user signin route
// Method: POST
// Route: /api/v1/user/signin

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    res
      .status(411)
      .json({ message: "Please check proper email address and username" });
  }

  console.log(req.body);

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    // send jwt token to verify
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "surajhingade"
    );

    res.json({
      token: token,
    });
  }
});

// update user info

router.put("/", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const checkUserById = await User.findById(userId);

  // console.log(checkUserById)

  const updateUser = await User.findByIdAndUpdate(userId, {
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  res.status(200).json({ message: "User information updated..!", updateUser });
});

// search route using query parameter 

router.get("/bulk", async (req, res) => {
    // get query data
    const filter = req.query.filter || "";

    // check query data in Database 
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    // if find send user informatiom
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


// get User information with authenticated

router.get("/userinfo",authMiddleware,async (req,res)=>{
     const userId = req.userId
    //  console.log(userId)
    try{
    const userInfo = await User.findById(userId);
    res.status(200).json({userInfo})
    }catch(error){
      res.status(411).json({message:error.message})
    }
})

module.exports = router;
