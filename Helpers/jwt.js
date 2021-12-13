const jwt = require("jsonwebtoken");
const signCallback = (req, res) => {};
/**
 * @description Generates a token given a payload and a secret.The expiry time parameter is optional.
 * @param {string} payload - payload to be signed
 * @param {strig} secret - secret key
 * @param {string} expiry - expiry time
 * @returns {Promise<String>} signed token
 */
const signToken = (payload, secret, expiry = undefined) => {
  return new Promise((resolve, reject) => {
    const signCallback = (err, token) => {
      if (err) {
        console.error(err);
        return reject(undefined);
      }
      return resolve(token);
    };
    if (expiry === undefined) {
      // Callback function for both the calls.
      jwt.sign(payload, secret, signCallback);
    } else {
      jwt.sign(payload, secret, { expiresIn: expiry }, signCallback);
    }
  });
};

/**
 * @description Verifies a token given a secret.
 * @param {string} token - token to be verified
 * @param {string} secret - secret key
 * @returns {Promise<{uid:String,ip:String,role?:String,time?:String}>} decoded token
 */
const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error(err);
        return reject(undefined);
      }
      console.log("Decoded Token: ", decoded);
      return resolve(decoded);
    });
  });
};
/**
 * @description Decrypts the incoming token for a request to a protected route.Works as an auth-guard.
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const verifyTokenMiddleware = async (req, res, next) => {
  try {
    let acs_tkn = req.headers.authorization.split(" ");
    let info = await verifyToken(acs_tkn[1], process.env.JWT_ACS_SECRET);
    console.log("Active user info: ", info);
    res.locals.info = info;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ status: "could not resolve token" });
  }
};
module.exports = {
  signJWT: signToken,
  verifyJWT: verifyToken,
  gateKeeper: verifyTokenMiddleware,
};
