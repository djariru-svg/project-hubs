const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// 1. Gutegura Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, 'project-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ==========================================
// POST: Gushyiraho project nshya
// ==========================================
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, description, category, tech_stack, price, demo_url } = req.body;
  const seller_id = req.user.id; 
  const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

  try {
    const [result] = await db.query(
      'INSERT INTO projects (seller_id, title, description, category, tech_stack, price, demo_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [seller_id, title, description, category, tech_stack, price, demo_url, image_url]
    );
    res.status(201).json({ message: 'Project created successfully', projectId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// GET: Kubona projects zose
// ==========================================
router.get('/', async (req, res) => {
  try {
    const [projects] = await db.query(`
      SELECT p.*, u.name as seller_name, u.university as seller_university 
      FROM projects p 
      JOIN users u ON p.seller_id = u.id 
      ORDER BY p.created_at DESC
    `);
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// GET: Kubona imibare y'umukoresha (MY STATS)
// ⚠️ IYI IGOMBA KUBA IMIBERE YE YOSE!
// ==========================================
router.get('/my/stats', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const [projectCount] = await db.query(
      'SELECT COUNT(*) as count FROM projects WHERE seller_id = ?', 
      [userId]
    );
    
    res.json({
      totalProjects: projectCount[0].count,
      totalEarnings: 0,
      rating: "Nta Manota"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// GET: Kubona project imwe (GET /:id)
// ⚠️ IYI IGOMBA KUBA IHEREYE KURI ROUTES ZOSE ZIFITE IZINDI ZINA!
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    // Reba neza: [req.params.id] iri muri array
    const [projects] = await db.query(`
      SELECT p.*, u.name as seller_name, u.university as seller_university 
      FROM projects p 
      JOIN users u ON p.seller_id = u.id 
      WHERE p.id = ?
    `, [req.params.id]);

    if (projects.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(projects[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;