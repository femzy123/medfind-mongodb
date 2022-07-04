const router = require("express").Router();
const { PrismaClient, Prisma } = require("@prisma/client");
const verify = require("../verifyToken");

const prisma = new PrismaClient();

router.post("/:id/profile", async (req, res) => {
  const newProfile = {
    userId: parseInt(req.params.id),
    bio: req.body.bio,
    city: req.body.city,
    services: req.body.services,
    state: req.body.state,
    country: req.body.country,
    address: req.body.address,
    location: req.body.location,
  };
  console.log(newProfile);
  try {
    const profile = await prisma.profile.create({
      data: newProfile,
    });
    res
      .status(201)
      .json({ response: "Profile created successfully", data: profile });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/profile", async (req, res) => {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: { profile: true },
    });
    const { password, role, ...info } = profile;
    res.status(200).json({ data: info });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update User
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === parseInt(req.params.id) || req.user.role === "ADMIN") {
    try {
      const user = await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.status(200).json({ message: "User updated succesfully", data: user });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json({ message: "You are not authorized!" });
  }
});

// Update User's Profile
router.put("/:id/profile", verify, async (req, res) => {
  if (req.user.id === parseInt(req.params.id) || req.user.role === "ADMIN") {
    try {
      const profile = await prisma.profile.update({
        where: { userId: Number(req.params.id) },
        data: req.body,
      });
      res
        .status(200)
        .json({ message: "Profile updated succesfully", data: profile });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json({ message: "You are not authorized!" });
  }
});


// Delete a user account
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === parseInt(req.params.id) || req.user.role === "ADMIN") {
    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send("Account deleted successfully");
    } catch (error) {
      res.status(500).json({ message: "Account not found" });
    }
  } else {
    res.status(401).json({ message: "You are not authorized" });
  }
});

export { router };