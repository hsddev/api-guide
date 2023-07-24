// Dependencies
const router = require("express").Router();
const {
    addTable,
    getAllTables,
    countEmptySeat,
} = require("../controllers/tableController");

router.route("/tables").post(addTable).get(getAllTables);
router.get("/seats_empty", countEmptySeat);

// Export module
module.exports = router;
