require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect");

const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.route");
const customerRouter = require("./routes/customer.routes");
const purchaseRouter = require("./routes/purchase.routes");

const { authenticateUser } = require("./middlewares/authentication");

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(express.json());
app.use(cors());
app.use(
  cookieParser(process.env.jwtSecret, {
    signed: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/customer", customerRouter);
app.use("/api/purchase", purchaseRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
