import express from 'express';
import pkg from '@prisma/client';
import multer from 'multer';
import path from'path';
import fs from 'fs';
const __dirname = path.resolve();
const {PrismaClient} =pkg;
const prisma = new PrismaClient();
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


router.get('/', async (req, res) => {
  try {
    const catalogueItems = await prisma.catalogue.findMany(); // Replace 'catalogue' with your actual Prisma model name

    res.status(200).json(catalogueItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching catalogue data' });
  }
});



router.post('/', upload.single('image'), async (req, res) => {
  const { brand, name, price, discountedPrice,image } = req.body;
  const currentDate = new Date();

  console.log('Received product data:', { brand, name, price, discountedPrice });

  try {
    const newCatalogueItem = await prisma.catalogue.create({
      data: {
        pName: name,
        pBrand: brand,
        pPrice: parseFloat(price),
        pDiscountedPrice: parseFloat(discountedPrice),
        pImage: req.file.filename, // Use the generated filename
        pDateRelease:currentDate
      },
    });
    res.status(201).json(newCatalogueItem);
  } catch (error) {
    console.error("Error creating catalogue item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
  
// route to delete a catalogue item by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  console.log(id)
    try {
      const deletedCatalogueItem = await prisma.catalogue.delete({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!deletedCatalogueItem) {
        res.status(404).json({ error: "Catalogue item not found" });
      } else {
        res.status(200).json({ message: "Catalogue item deleted successfully" });
      }
    } catch (error) {
      console.error("Error deleting catalogue item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
export default router;