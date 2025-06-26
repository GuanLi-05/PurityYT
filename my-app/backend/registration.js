import bcrypt from 'bcrypt'
import express from 'express'

///////////////////////////////////
// Route exporting for app.js
///////////////////////////////////

export const handleRegisterRouter = express.Router();

///////////////////////////////////
// Routes
///////////////////////////////////

handleRegisterRouter.post('', (req, res) => {
  const { fname, lname, email, password } = req.body;
  console.log(fname + lname + email + password);
})

///////////////////////////////////
// Encryption
///////////////////////////////////

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const isValid = await bcrypt.compare(submittedPassword, user.password)

///////////////////////////////////
// Prisma
///////////////////////////////////

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a user
  const newUser = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      password: "hashedpassword123",
    },
  })

  console.log("Created user:", newUser)

  // Query user by email
  const user = await prisma.user.findUnique({
    where: { email: "alice@example.com" },
  })

  console.log("Found user:", user)
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
