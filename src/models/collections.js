'use strict'

const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Groups' },
    items: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Items' }
    ]
});

module.exports = mongoose.model("Collections", collectionSchema);
