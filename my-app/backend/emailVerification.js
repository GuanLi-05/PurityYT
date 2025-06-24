import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Redis from 'redis';

dotenv.config();

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

///////////////////////////////////
// Routes
///////////////////////////////////
sendCodeRouter.post("/email/verify/send", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is invalid" });
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
    res.json({ message: `email sent successfully to ${email}` });
  } catch (e) {
    res.status(500).json({ error: "Failed to send email: " + e });
  }
})



//  const storedCode = await redis.get(email);








/* app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  const record = verificationCodes[email];

  if (!record) return res.status(400).json({ error: "No code found" });
  if (Date.now() > record.expiresAt) return res.status(400).json({ error: "Code expired" });
  if (code !== record.code) return res.status(400).json({ error: "Incorrect code" });

  delete verificationCodes[email]; // optional: prevent reuse
  res.json({ success: true, message: "Email verified!" });
}); */

