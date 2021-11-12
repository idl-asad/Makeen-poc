'use strict'

const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Groups' },
});

module.exports = mongoose.model("Roles", rolesSchema);
