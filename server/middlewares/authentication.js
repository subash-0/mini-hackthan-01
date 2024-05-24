const customError = require("../errors");
const { isTokenValid } = require("../utils/index");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new customError.UnauthenticatedError(
      "You cannot access it, Authentication invalid"
    );
  }
  try {
    const payload = isTokenValid({ token });
    const { name, userId } = payload;
    req.user = { name, userId };

    next();
  } catch (error) {
    throw new customError.UnauthenticatedError(
      "You cannot access it, Authentication invalid"
    );
  }
};

module.exports = { authenticateUser };
