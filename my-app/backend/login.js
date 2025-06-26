import bcrypt from 'bcrypt'
import express from 'express'
import prisma from './prisma.js'

///////////////////////////////////
// Encryption
///////////////////////////////////

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

export const handleLoginRouter = express.Router();

///////////////////////////////////
// Routes
///////////////////////////////////

handleLoginRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Details failed to parse. Please try again later." });
  console.log(email + password);
  res.status(200).json({ message: email });
})