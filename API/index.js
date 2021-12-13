const router = require('express').Router();

router.get("/",(req,res)=>{
    res.status(200).json({status: "API working correctly!"});
})
router.use("/auth",require("./auth"));
router.use("/token",require("./regenerate"));
module.exports = router;