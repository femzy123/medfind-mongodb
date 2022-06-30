const router = require("express").Router();
const { PrismaClient, Prisma } = require("@prisma/client");
const CryptoJS = require("crypto-js");

const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  console.log(req.body)
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    role: req.body.role,
  }
  try {
    const user = await prisma.user.create({
      data: newUser
    })
    const {password, ...info} = user
    res.status(201).json({response: "User created successfully", data: info})
  } catch (err) {
    var message;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (err.code === "P2002") {
        message =  "A new user cannot be created with this email"
      }
    }
    res.status(500).json({message: message, ...err});
    console.log(err)
  }

})

module.exports = router;