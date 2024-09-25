import { Router } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/Product';

const router = Router();

// Retrieves all products with less than 5 in stock, returns contact info
router.get('/critical-stock', async (req, res) => {
  try {
    const products = await Product.find({ amountInStock: { $lt: 5 } })
      .select('manufacturer.name manufacturer.contactInfo.name manufacturer.contactInfo.phone manufacturer.contactInfo.email');

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all products with less than 10 units in stock
router.get('/low-stock', async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ amountInStock: { $lt: 10 } })
      .select('name _id sku price amountInStock');
    res.json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieves the total stock value by all products
router.get('/total-stock-value', async (req, res) => {
  try {
    const totalStockValue = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStockValue: { $sum: { $multiply: ["$price", "$amountInStock"] } },
        },
      },
    ]);
    res.json({ totalStockValue: totalStockValue[0]?.totalStockValue || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieves the total stock value by manufacturer
router.get("/total-stock-value-by-manufacturer", async (req, res) => {
  try {
    const totalStockValueByManufacturer = await Product.aggregate([
      {
        $group: {
          _id: "$manufacturer.name",
          totalStockValue: {
            $sum: { $multiply: ["$price", "$amountInStock"] },
          },
        },
      },
      {
        $project: {
          _id: 1,
          totalStockValue: { $round: ["$totalStockValue", 2] }, // Round to 2 decimal places
        },
      },
      {
        $sort: { totalStockValue: -1 }, // Sort by totalStockValue in descending order
      },
    ]);

    const result = totalStockValueByManufacturer.reduce((acc, cur) => {
      acc[cur._id] = cur.totalStockValue;
      return acc;
    }, {});

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Retrieves all products with query filters
router.get('/', async (req, res) => {
  try {
    const { category, manufacturer, inStock } = req.query;
    const query: any = {};
    if (category && typeof category === 'string') {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    if (manufacturer && typeof manufacturer === 'string') {
      query['manufacturer.name'] = { $regex: new RegExp(manufacturer, 'i') };
    }
    if (inStock === 'true') {
      query.amountInStock = { $gt: 1 };
    } else if (inStock === 'false') {
      query.amountInStock = { $lt: 1 };
    }
    const products = await Product.find(query);
    res.json({
      products,
      totalProducts: products.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Retrieve a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
