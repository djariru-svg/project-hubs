const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

// ==========================================
// @route   POST /api/auth/register
// @desc    Kwiyandikisha (Register a new user)
// @access  Public
// ==========================================
router.post('/register', async (req, res) => {
  const { name, email, password, university, role } = req.body;

  try {
    // 1. Kureba niba umukoresha asanzwe ahari (Check if user exists)
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Uyu mukoresha asanzwe yiyandikishije (User already exists)' });
    }

    // 2. Guhisha ijambo banga (Hash password)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Kubika umukoresha muri database (Insert user into DB)
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, university, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, university, role || 'student']
    );

    // 4. Gukora Token (Create JWT Token)
    const payload = { user: { id: result.insertId, role: role || 'student' } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 5. Gusubiza Frontend (Return response)
    res.status(201).json({
      message: 'Umukoresha yiyandikishije neza (User registered successfully)',
      token,
      user: { id: result.insertId, name, email, university, role: role || 'student' }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hari ikibazo kuri server (Server error)' });
  }
});

// ==========================================
// @route   POST /api/auth/login
// @desc    Kwinjira (Authenticate user & get token)
// @access  Public
// ==========================================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Kureba niba umukoresha ahari (Check if user exists)
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Amakuru ntari yo (Invalid credentials)' });
    }

    const user = users[0];

    // 2. Kugereranya ijambo banga (Check password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Amakuru ntari yo (Invalid credentials)' });
    }

    // 3. Gukora Token nshya (Create JWT Token)
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 4. Gusubiza Frontend (Return response)
    res.json({
      message: 'Winjiye neza (Login successful)',
      token,
      user: { id: user.id, name: user.name, email: user.email, university: user.university, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hari ikibazo kuri server (Server error)' });
  }
});

module.exports = router;