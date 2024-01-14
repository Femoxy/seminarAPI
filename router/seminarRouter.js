const express = require("express");

const router = express.Router();

const {bookSeat, allBookedseat, bookedseat, updateSeat, deleteSeat} = require("../controller/seminarController");
// endpoint to book a seat
router.post("/myseat", bookSeat);
// endpoint to get all booked seat
router.get("/seminarseats", allBookedseat);
// endpoint to get one booked seat
router.get("/singleseat/:seatId", bookedseat);
// endpoint to update a seminar seat
router.put("/seat/:seatId", updateSeat);
// endpoint to delete a seminar seat
router.delete("/removeseat/:seatId", deleteSeat);

module.exports = router;
