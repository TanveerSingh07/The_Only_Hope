import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import mongoose from 'mongoose'; // Uncomment when you connect your DB!

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Crucial so React can talk to this server
app.use(express.json());

// ─── MOCK DATABASE (Replace with Mongoose Models later) ───
const usersDB = []; 

// ─── AUTHENTICATION ROUTES ───

// 1. Sign Up Route
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const userExists = usersDB.find(u => u.email === email);
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password & save (Using mock DB for now)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = { id: Date.now(), name, email, password: hashedPassword };
    usersDB.push(newUser);

    // Create JWT Token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 2. Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = usersDB.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(` Auth Service running on http://localhost:${PORT}`);
});