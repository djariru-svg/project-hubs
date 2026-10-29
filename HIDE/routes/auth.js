const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();


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


// ==========================================
// @route   PUT /api/auth/profile
// @desc    Kuvugurura umwirondoro (Update profile)
// @access  Private
// ==========================================
router.put('/profile', async (req, res) => {
  // Turacyashyizeho authMiddleware hano, ariko tuzayishyiraho mu gihe kizaza
  // Ubu turafata ID mu mutwe (headers) cyangwa muri token niba tuyifite
  
  // Kugira ngo dukoreshe token, reka dukoreshe iyi uburyo bworoshye:
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Nta token yatanzwe' });
  
  const token = authHeader.split(' ')[1];
  
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const { name, university, password } = req.body;

    // 1. Niba ashaka guhindura password
    if (password && password.trim() !== '') {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      await db.query(
        'UPDATE users SET name = ?, university = ?, password = ? WHERE id = ?',
        [name, university, hashedPassword, userId]
      );
    } else {
      // 2. Niba adahindura password
      await db.query(
        'UPDATE users SET name = ?, university = ? WHERE id = ?',
        [name, university, userId]
      );
    }

    // Fata amakuru mashya yo kumusubiza
    const [users] = await db.query('SELECT id, name, email, university, role FROM users WHERE id = ?', [userId]);
    
    res.json({ message: 'Umwirondoro wahinduwe neza!', user: users[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error cyangwa Token ntiyemewe' });
  }
});

module.exports = router;
