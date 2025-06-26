import bcrypt from 'bcrypt'
import express from 'express'
import prisma from './prisma.js'

async function verifyPassword(password) {
    try {
        const isValid = await bcrypt.compare(password, user.password)
    } catch (error) {
        throw new Error(error);
    }
}
