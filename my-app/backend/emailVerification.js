import express from 'express'
import nodemailer from 'nodemailer'
import Redis from 'redis';
import prisma from './prisma.js'

///////////////////////////////////
// Redis Setup
///////////////////////////////////

const redis = Redis.createClient({
  url: process.env.REDIS_URL
});
redis.on("error", (err) => console.error("Redis error:", err));
(async () => {
  await redis.connect();
})();

///////////////////////////////////
// Nodemailer Setup
///////////////////////////////////

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const sendCodeRouter = express.Router();
export const verifyCodeRouter = express.Router();
export const checkUniqueEmail = express.Router();

///////////////////////////////////
// Routes
///////////////////////////////////

/* 
 * Sends a verification email containing OTP code
 */
sendCodeRouter.post("/email/verify/send", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email failed to parse. Please try again later." });
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  try {
    await redis.del(email);
    await redis.setEx(email, 600, code);
    await transporter.sendMail({
      from: `"MyApp" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}. This code will expire in 10 minutes.`,
    });
    return res.status(200).json({ message: `Email sent successfully to ${email}.` });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Email failed to send. Please try again later." });
  }
})

/* 
 * Confirms whether user OTP code matches the stored OTP code 
 * Max 3 failed attempts before a 3 min timeout
 */
verifyCodeRouter.post("/email/verify/confirm", async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: "Email or passkey failed to parse. Please try again later." });

  const MAX_ATTEMPTS = 3;
  const TIMEOUT_SECONDS = 180;

  try {
    const failCount = await redis.get(`fail:${email}`);
    if (failCount && parseInt(failCount) >= MAX_ATTEMPTS) {
      return res.status(429).json({ error: "Too many failed attempts. Please try again later." });
    }

    const storedCode = await redis.get(email);
    if (!storedCode) return res.status(400).json({ error: "Passkey has expired. Please refresh the page." });
    if (storedCode === code) {
      await redis.del(email);
      await redis.del(`fail:${email}`);
      return res.status(200).json({ message: "Completing registration." });
    } else {
      const n = await redis.incr(`fail:${email}`);
      if (n === MAX_ATTEMPTS) {
        await redis.expire(`fail:${email}`, TIMEOUT_SECONDS);
      }
      return res.status(400).json({ header: "Incorrect Passkey", error: "Try again." });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to verify passkey. Please try again later." });
  }
})

/* Checks if email is unique */
checkUniqueEmail.post("/email/unique", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email failed to parse. Please try again later." });
  }

  try {
    const find = await prisma.credentials.findUnique({
      where: { email },
    });

    if (find) {
      return res.json({ unique: false });
    } else {
      return res.json({ unique: true });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

