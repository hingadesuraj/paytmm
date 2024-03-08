const jwt = require("jsonwebtoken");


const secrate = process.env.JWT_SECRATE

const authMiddleware = (req, res, next) => {
  // get headers
  const authHeader = req.headers.authorization;

  // check header with bearer or not
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  // decode header

  const token = authHeader.split(" ")[1];

  try {
    const decodeHeader = jwt.verify(token, "surajhingade");
    // const decodeHeader = jwt.verify(token, secrate);


    // pass username or useeid to req body can acces in route for further use
    req.userId = decodeHeader.userId;

    next();
  } catch (err) {
    res.status(411).json({ error: err.message });
  }
};

module.exports = authMiddleware;
