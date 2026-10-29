const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// ==========================================
// POST: Kugura (Checkout)
// ==========================================
router.post('/', authMiddleware, async (req, res) => {
  const { items } = req.body; 
  const buyer_id = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Igare ryawe nta kintu kirimo.' });
  }

  try {
    for (let item of items) {
      const project_id = item.id;
      const amount = item.price;

      // 1. Fata amakuru ya project kugira ngo turebe nyirizina
      const [projectData] = await db.query('SELECT seller_id FROM projects WHERE id = ?', [project_id]);
      
      if (projectData.length === 0) {
        return res.status(404).json({ message: 'Project ntabwo ibonetse.' });
      }

      // ⚠️ IYI NI YO TWONGEREYE: Reba niba atari we wakoze iyi project
      if (projectData[0].seller_id === buyer_id) {
        return res.status(400).json({ message: 'Ntushobora kugura project yawe bwite!' });
      }

      // 2. Reba niba iyi project itaraguzwe n'undi
      const [existingOrder] = await db.query('SELECT * FROM orders WHERE project_id = ?', [project_id]);
      if (existingOrder.length > 0) {
        return res.status(400).json({ message: `Project "${item.title}" isanzwe yaguzwe n'undi muntu.` });
      }

      // 3. Bika ubuguzi muri database
      await db.query(
        'INSERT INTO orders (buyer_id, project_id, amount) VALUES (?, ?, ?)',
        [buyer_id, project_id, amount]
      );
    }

    res.status(201).json({ message: 'Ubwishyu bwagenze neza! Ubu ushobora kubona projects zawe.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// ==========================================
// GET: Kubona ibyo umugurisha yagurishije (Seller Sales)
// ==========================================
router.get('/my-sales', authMiddleware, async (req, res) => {
  const seller_id = req.user.id;

  try {
    const [sales] = await db.query(`
      SELECT o.id as order_id, o.amount, o.created_at, o.status,
             p.title, p.image_url,
             u.name as buyer_name, u.email as buyer_email
      FROM orders o
      JOIN projects p ON o.project_id = p.id
      JOIN users u ON o.buyer_id = u.id
      WHERE p.seller_id = ?
      ORDER BY o.created_at DESC
    `, [seller_id]);

    // Kubara amafaranga yose yinjiye
    const totalEarnings = sales.reduce((sum, sale) => sum + Number(sale.amount), 0);

    res.json({ sales, totalEarnings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// GET: Kureba niba umukoresha yaguze iyi project
// ==========================================
router.get('/check/:project_id', authMiddleware, async (req, res) => {
  const buyer_id = req.user.id;
  const project_id = req.params.project_id;

  try {
    const [orders] = await db.query(
      'SELECT * FROM orders WHERE buyer_id = ? AND project_id = ?',
      [buyer_id, project_id]
    );

    if (orders.length > 0) {
      res.json({ hasPurchased: true });
    } else {
      res.json({ hasPurchased: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;



