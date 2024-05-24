const express = require("express");
const router = express.Router();

const {
  createPurchase,
  searchCustomers,
  searchProducts,
  totalSalesOfDay,
  salesToday,
} = require("../controllers/purchase.controller");

router.post("/", createPurchase);
router.get("/find-customer", searchCustomers);
router.get("/find-products", searchProducts);
router.get("/sales", salesToday);
router.get("/total-sales", totalSalesOfDay);

module.exports = router;
