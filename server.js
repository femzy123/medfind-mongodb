const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/profile");

app.use(cors());
dotenv.config();

const port = process.env.PORT || 1337;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server works fine")
})

app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


app.listen(port, () => {
  console.log("Medfind server running on port " + port);
});
