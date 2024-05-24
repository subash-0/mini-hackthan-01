const Customer = require("../models/customer.model");
const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");
const CustomError = require("../errors");

const createPurchase = async (req, res) => {
  const { customerName, productName, paidAmount, quantity } = req.body;
      
  const customer = await Customer.findOne({
    name: { $regex: customerName, $options: "i" },
  });
  // if (!customerName) {
  //   customerName = "random";
  // }

  const product = await Product.findOne({
    name: { $regex: productName, $options: "i" },
  });
  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Product not found. Please add product." });
  }
  const totalAmount = product.price * quantity;

  if (paidAmount > totalAmount) {
    throw new CustomError.BadRequestError("Cannot pay more than total amount");
  }

  const dueAmount = totalAmount - paidAmount;

  const newPurchase = {
    product: product._id,
    quantity,
    totalAmount,
    paidAmount,
    dueAmount,
  };

  customer.purchases.push(newPurchase);

  await customer.save();

  res.status(StatusCodes.OK).json({ newPurchase, customerName });
};

const searchCustomers = async (req, res) => {
  const customers = await Customer.find({});
  if (!customers) {
    throw new CustomError.NotFoundError("Users not found");
  }
  res.status(StatusCodes.OK).json({ customers });
};

const searchProducts = async (req, res) => {
  const products = await Customer.find({});
  if (!products) {
    throw new CustomError.NotFoundError("Users not found");
  }
  res.status(StatusCodes.OK).json({ products });

};

const totalSalesOfDay = async (req, res) => {
  const startOfDay = moment().startOf("day");
  const endOfDay = moment().endOf("day");

  const sales = await Customer.aggregate([
    {
      $unwind: "$purchases",
    },
    {
      $match: {
        "purchases.dateBought": {
          $gte: startOfDay.toDate(),
          $lte: endOfDay.toDate(),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$purchases.totalAmount" },
        totalPaid: { $sum: "$purchases.paidAmount" },
        totalDue: { $sum: "$purchases.dueAmount" },
      },
    },
  ]);

  const { totalSales, totalPaid, totalDue } =
    sales.length > 0 ? sales[0] : { totalSales: 0, totalPaid: 0, totalDue: 0 };

  res.status(StatusCodes.OK).json({ totalSales, totalPaid, totalDue });
};

const salesToday = async (req, res) => {
  const currentDate = new Date();
  const startTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );
  const endTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    12,
    0,
    0
  );

  const customers = await Customer.find({})
    .select("name purchases")
    .populate({
      path: "purchases",
      match: { dateBought: { $gte: startTime, $lt: endTime } },
      select: "product quantity totalAmount paidAmount dueAmount",
      populate: { path: "product", select: "name price" },
    });

  const formattedResponse = customers.map((customer) => {
    const totalPaid = customer.purchases.reduce(
      (total, purchase) => total + purchase.paidAmount,
      0
    );
    const totalDueRemaining = customer.purchases.reduce(
      (total, purchase) => total + purchase.dueAmount,
      0
    );

    return {
      name: customer.name,
      totalPaid: totalPaid,
      totalDueRemaining: totalDueRemaining,
      purchases: customer.purchases.map((purchase) => ({
        productName: purchase.product.name,
        price: purchase.product.price,
        quantity: purchase.quantity,
        total: purchase.totalAmount,
      })),
    };
  });

  res.json({ customers: formattedResponse });
};

module.exports = {
  createPurchase,
  searchCustomers,
  searchProducts,
  totalSalesOfDay,
  salesToday,
};
