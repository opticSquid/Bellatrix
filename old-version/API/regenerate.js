const router = require("express").Router();
const jwt = require("../Helpers/jwt");
const db = require("../Connections/user");
const checkToken = async (req, res, next) => {
  const r_token = req.headers.authorization.split(" ");
  if (r_token) {
    try {
      let info = await jwt.verifyJWT(r_token[1], process.env.JWT_REF_SECRET);
      res.locals.info = info["uid"];
      next();
    } catch (err) {
      res.status(401).json({ status: "could not resolve token" });
      res.end();
    }
  }
};
const checkUserInDB = async (req, res, next) => {
  try {
    const userDetails = await db.FindUser(undefined, res.locals.info, {
      _id: 0,
    });
    console.log("User Details: ", userDetails);
    if (userDetails !== undefined && userDetails.IP === req.ip) {
      next();
    } else {
      res.status(401).json({ status: "user session not found" });
      res.end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "user could not be fetched" });
    res.end();
  }
};
const createToken = async (req, res) => {
  let token = await jwt.signJWT(
    { uid: res.locals.info, ip: req.ip },
    process.env.JWT_ACS_SECRET,
    900
  );
  token = `Bearer ${token}`;
  res.status(200).json({ acs_tkn: token });
};
router.get("/actoken", checkToken, checkUserInDB, createToken);

module.exports = router;
