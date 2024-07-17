import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import dalleRoutes from './routes/dalle.routes.js';
import catalogueRoutes from './routes/catalogue.js';
import adminAuthRoutes from './routes/adminAuth.js';

dotenv.config();  // Load environment variables at the very top
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/catalogue', catalogueRoutes);
app.use('/api/admin', adminAuthRoutes);

// Default route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
