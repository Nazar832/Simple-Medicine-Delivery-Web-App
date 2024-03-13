const Router = require('express');
const db = require('../data/database.js')

const router = new Router();

router.get('/shops', async (req, res) => {
    try {
      const result = await db.query('SELECT name FROM Shop');
      const shops = result.rows;
      res.json(shops);
    } catch (error) {
      console.error('Error getting the shops list', error);
      res.sendStatus(500);
    }
  });

  router.get('/medicines', async (req, res) => {
    try {
      const shopName = req.query.shopName;
      const shopId = await db.query('SELECT id FROM Shop WHERE name = ($1)', [shopName]);
      const result = await db.query('SELECT * FROM MedicineItem WHERE shop_id = ($1)', [shopId.rows[0].id]);

      const medicineItems = result.rows;
      res.json(medicineItems);
    } catch (error) {
      console.error('Error executing query', error);
      res.sendStatus(500);
    }
  });

  module.exports = router;