const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

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

app.listen(port, () => {
  console.log("Medfind server running on port " + port);
});
