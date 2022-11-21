const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    credentials: {
        userName: {
            type: String,
            maxLength: 25,
            required: true,
            unique : true,
            immutable: true
        },
        password: {
            type: String,
            maxLength: 127,
            required: true,
            select: false
        },
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    NIC: {
        type: String,
        maxLength: 14,
        required: true
    },
    cell: {
        type: String,
        maxLength: 11,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);