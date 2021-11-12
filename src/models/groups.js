'use strict'

const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    collections: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Collections' }
    ]
});

module.exports = mongoose.model("Groups", groupSchema);
