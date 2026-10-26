const express = require('express');
const cors = require('cors');
const path = require('path')
require('dotenv').config();

const app = express();



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects')); // <-- ONGERAHO IYI MURONGO

// IYI MIRONGO IREKA EXPRESS YEREKANA AMAFOTO ARIMO MURI FOLDER UPLOADS
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
app.get('/', (req, res) => {
  res.send('Project Hubs API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});