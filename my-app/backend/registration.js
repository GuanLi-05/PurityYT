import bcrypt from 'bcrypt'
import express from 'express'
import prisma from './prisma.js'

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

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const handleRegisterRouter = express.Router();

///////////////////////////////////
// Routes
///////////////////////////////////

handleRegisterRouter.post('/register', async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const encPassword = await encryptPassword(password);
    await prisma.credentials.create({
      data: {
        firstName: fname,
        lastName: lname,
        email: email,
        password: encPassword,
      },
    });
    res.status(201).json({ message: "Completing registration." });
  } catch (e) {
    console.error(e);
    console.log(e);
    return res.status(500).json({ error: "Please try again later." });
  }
})

