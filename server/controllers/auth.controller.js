const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { phone } = req.body;

  const phoneAlreadyExist = await User.findOne({ phone });
  if (phoneAlreadyExist) {
    throw new CustomError.BadRequestError(
      "User with this phone number already exist"
    );
  }

  const user = await User.create(req.body);
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ tokenUser });
};

const login = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    throw new CustomError.BadRequestError("Enter both phone and password");
  }
  const user = await User.findOne({ phone });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credential");
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new CustomError.UnauthenticatedError("Invalid password");
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5000),
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out" });
};

module.exports = { register, login, logout };
