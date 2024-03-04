const express = require("express");
const app = express();
const cors = require("cors");
const zod = require("zod");
const connectToDb = require("./db");
const dotenv = require("dotenv").config();
const rootRouter = require("./routes/index");  // import root router


app.use(express.json());
app.use(cors());

// connect to Database
connectToDb();

// use Router
app.use("/api/v1",rootRouter)

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
