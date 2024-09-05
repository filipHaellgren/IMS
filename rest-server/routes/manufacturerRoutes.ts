import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

// Retrieve a list of all manufacturers
router.get('/manufacturers', async (req, res) => {
  try {
    const manufacturers = await Product.distinct('manufacturer.name');
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;