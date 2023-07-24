// Dependencies
const router = require("express").Router();
const tableRoute = require("./tableRoute");
const guestRoute = require("./guestRoute");

router.use("/", tableRoute);
router.use("/", guestRoute);

module.exports = router;
