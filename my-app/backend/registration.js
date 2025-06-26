import bcrypt from 'bcrypt'
import express from 'express'
import { PrismaClient } from '@prisma/client'

///////////////////////////////////
// Prisma
///////////////////////////////////

const prisma = new PrismaClient()

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});


///////////////////////////////////
// Encryption
///////////////////////////////////

async function encryptPassword(password) {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
}

async function verifyPassword(password) {
  try {
    const isValid = await bcrypt.compare(password, user.password)
  } catch (error) {
    throw new Error(error);
  }
}

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const handleRegisterRouter = express.Router();

///////////////////////////////////
// Routes
///////////////////////////////////

handleRegisterRouter.post('/register', async (req, res) => {
  const { fname, lname, email, password } = req.body;
  console.log(fname + lname + email + password);
  try {
    const encPassword = await encryptPassword(password);
    const newUser = await prisma.credentials.create({
      data: {
        firstName: fname,
        lastName: lname,
        email: email,
        password: encPassword,
      },
    });
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    console.error(e);
    console.log(e);
    return res.status(500).json({ error: "Please try again later." });
  }
})
