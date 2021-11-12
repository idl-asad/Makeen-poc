'use strict'

const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collections' }
});

module.exports = mongoose.model("Items", ItemSchema);
