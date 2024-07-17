import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const router = express.Router();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await prisma.adminUser.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Compare password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.status(200).json({ message: 'Login successful', token });
});

export default router;
