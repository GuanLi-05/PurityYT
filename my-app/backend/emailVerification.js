import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();
export const sendCodeRouter = express.Router();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

sendCodeRouter.post("/email/verify/send", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({error: "Email is invalid"});
  res.json({message: email})
})

