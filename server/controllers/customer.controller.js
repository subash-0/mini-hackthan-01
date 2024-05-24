const Customer = require("../models/customer.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(StatusCodes.OK).json({ customer });
};

const getAllCustomer = async (req, res) => {
  const customers = await Customer.find({});

  const customersWithPaymentInfo = customers.map((customer) => {
    let customerTotalDueAmount = 0;
    let customerTotalPaidAmount = 0;

    customer.purchases.forEach((purchase) => {
      customerTotalDueAmount += purchase.dueAmount;
      customerTotalPaidAmount += purchase.paidAmount;
    });

    const totalAmount = customerTotalDueAmount + customerTotalPaidAmount;

    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      totalAmount: totalAmount,
      totalDueAmount: customerTotalDueAmount,
      totalPaidAmount: customerTotalPaidAmount,
    };
  });

  const sortedCustomers = customersWithPaymentInfo.sort(
    (a, b) => b.totalDueAmount - a.totalDueAmount
  );

  res.status(StatusCodes.OK).json({ customers: sortedCustomers });
};

const getCustomer = async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new CustomError.BadRequestError("No customer with such ID found");
  }
  res.status(StatusCodes.OK).json({ customer });
};

//to calculate total due, total paid amount
const payementInfo = async (req, res) => {
  const customers = await Customer.find();

  const amountsWithUser = [];

  customers.forEach((customer) => {
    let customerTotalDueAmount = 0;
    let customerTotalPaidAmount = 0;

    customer.purchases.forEach((purchase) => {
      customerTotalDueAmount += purchase.dueAmount;
      customerTotalPaidAmount += purchase.paidAmount;
    });
    const totalAmount = customerTotalDueAmount + customerTotalPaidAmount;

    if (customerTotalDueAmount > 0) {
      amountsWithUser.push({
        id: customer._id,
        user: customer.name,
        totalDueAmount: customerTotalDueAmount,
        totalPaidAmount: customerTotalPaidAmount,
        totalAmount: totalAmount,
      });
    }
  });
  res.status(StatusCodes.OK).json(amountsWithUser);
};

const dueClearance = async (req, res) => {
  const { name, payment } = req.body;
  const customer = await Customer.findOne({ name });

  if (!customer) {
    return CustomError.BadRequestError("User not found");
  }

  for (const purchase of customer.purchases) {
    const remainingDue = purchase.dueAmount - payment;
    purchase.dueAmount = Math.max(0, remainingDue);
  }

  customer.totalDue = customer.purchases.reduce(
    (total, purchase) => total + purchase.dueAmount,
    0
  );

 const responsData = await customer.save();

  res.status(StatusCodes.OK).json({ responsData });
};

module.exports = {
  createCustomer,
  getAllCustomer,
  getCustomer,
  payementInfo,
  dueClearance,
};
