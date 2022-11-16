const router = require("express").Router();
const checkAdmin = require("../../middlewares/checkAdmin");

router.get("/", checkAdmin, (req, res, next) => {
  res.send("Admin Index Router");
});

module.exports = router;
