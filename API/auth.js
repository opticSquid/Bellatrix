const router = require("express").Router();
const user = require("../Connections/user");
const hash = require("../Helpers/hash");
const jwt = require("../Helpers/jwt");
// Login route
const findExistingUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Email: ", email, "\nPassword: ", password);
    const userDetail = await user.FindUser(email, undefined, { _id: 0 });
    if (!userDetail) return res.status(401).json({ status: "invalid email" });
    const isMatch = await hash.isValidPassword(password, userDetail.Password);
    console.log("isMatch: ", isMatch);
    if (!isMatch) {
      return res.status(401).json({ status: "invalid password" });
    } else {
      res.locals.user = userDetail;
      next();
    }
  } catch (error) {
    res.status(500).json({ status: "cannot process login request." });
    res.end();
  }
};
const startSession = async (req, res, next) => {
  try {
    const { uid, Role } = res.locals.user;
    console.log("Local variable User: \n", res.locals.user);
    const ip = req.ip;
    // Parallalizing two independent async calls for speed.
    let tokens = await Promise.all([
      //refresh-token
      jwt.signJWT(
        { uid: uid, ip: ip, role: Role, time: Date.now().toString() },
        process.env.JWT_REF_SECRET
      ),
      // access-token
      jwt.signJWT({ uid: uid, ip: ip }, process.env.JWT_ACS_SECRET, 900),
    ]);
    r_token = "Bearer" + " " + tokens[0];
    a_token = "Bearer" + " " + tokens[1];
    const session = await user.InitiateSession(uid, ip, r_token);
    if (session) {
      res.locals.session = { r: r_token, a: a_token };
      next();
    } else {
      res.status(500).json({ status: "cannot process login request." });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "cannot process login request." });
    res.end();
  }
};
const sendResponse = (req, res) => {
  const { r, a } = res.locals.session;
  res.status(200).json({ status: "login success", ref_tkn: r, acs_tkn: a });
};
router.post("/login", findExistingUser, startSession, sendResponse);

//logout route
const endSession = async (req, res) => {
  try {
    await user.TerminateSessoin(res.locals.info.uid);
    if (user) {
      res.status(200).json({ status: "logout success" });
    } else {
      res.status(401).json({ status: "cannot process logout request." });
    }
  } catch (err) {
    res.status(500).json({ status: "cannot process logout request." });
    res.end();
  }
};
router.delete("/logout", jwt.gateKeeper, endSession);
module.exports = router;
