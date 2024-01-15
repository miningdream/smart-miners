const router = require("express").Router();

router.use("/news", require("./news"));
router.use("/courses", require("./courses"));

module.exports = router;