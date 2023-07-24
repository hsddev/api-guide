// Dependencies
const router = require("express").Router();
const {
    addGuest,
    deleteGuest,
    getArrivedGuests,
    getGuestList,
    updateArrivedGuests,
} = require("../controllers/guestController");

router.get("/guest_list", getGuestList);
router.get("/guests", getArrivedGuests);
router.route("/guests/:name").delete(deleteGuest).put(updateArrivedGuests);
router.post("/guest_list/:name", addGuest);

// Export module
module.exports = router;
