const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// 1. Gutegura Multer (Bika muri folder uploads)
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
// POST: Gushyiraho project nshya (Ifite Ifoto)
// ==========================================
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  // Reba amakuru yose aje (Kugira ngo turebe niba ifoto iri muri req.file)
  console.log('File yabonetse:', req.file); 
  console.log('Amakuru yaje:', req.body);

  const { title, description, category, tech_stack, price, demo_url } = req.body;
  const seller_id = req.user.id; 
  
  // Niba ifoto yatanzwe, fata link yayo. Niba ntabwo, bijye kuri null
  const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

  try {
    const [result] = await db.query(
      'INSERT INTO projects (seller_id, title, description, category, tech_stack, price, demo_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [seller_id, title, description, category, tech_stack, price, demo_url, image_url]
    );

    res.status(201).json({ 
      message: 'Project created successfully', 
      projectId: result.insertId 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ==========================================
// @route   GET /api/projects
// @desc    Kubona projects zose (Get all projects)
// @access  Public
// ==========================================
router.get('/', async (req, res) => {
  try {
    // Dufata na amakuru y'umugurisha (Seller)
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
// @route   GET /api/projects/:id
// @desc    Kubona project imwe (Get single project)
// @access  Public
// ==========================================
router.get('/:id', async (req, res) => {
  try {
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

// ==========================================
// @route   GET /api/projects/my/stats
// @desc    Kubona imibare y'umukoresha (stats ze)
// @access  Private
// ==========================================
router.get('/my/stats', authMiddleware, async (req, res) => {
  const userId = req.user.id; // ID y'umukoresha wayo

  try {
    // 1. Kubara projects umukoresha afite
    const [projectCount] = await db.query(
      'SELECT COUNT(*) as count FROM projects WHERE seller_id = ?', 
      [userId]
    );

    // 2. Kubara amafaranga yinjiye (Ama projects yaguzwe)
    // (Turacyashyizeho table y'ubuguzi, ariko reka tubare ama projects afite gusa)
    
    res.json({
      totalProjects: projectCount[0].count,
      totalEarnings: 0, // Bizaza nyuma y'ubuguzi
      rating: "Nta Manota" // Bizaza nyuma ya reviews
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;