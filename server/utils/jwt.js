const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  // console.log(payload);
  const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1d" });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.jwtSecret);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 9000000),
    // secure: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};
module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
