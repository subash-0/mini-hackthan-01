const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomer,
  getAllCustomer,
  payementInfo,
  dueClearance,
} = require("../controllers/customer.controller");

router.post("/", createCustomer);
router.post("/clear-due", dueClearance);
router.get("/amount", payementInfo);
router.get("/:id", getCustomer);
router.get("/", getAllCustomer);

module.exports = router;
