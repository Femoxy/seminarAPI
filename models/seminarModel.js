const mongoose = require('mongoose')

const seminarSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        seatNumber: {
            type: String,
            required: true,
        
        },
        topic: {
            type: String,
            required: true,
        },
        section: {
            type: String,
            required: true
        }

}, {timestamps: true}
);

const seminarModel = mongoose.model("bookseat", seminarSchema);

module.exports = seminarModel;