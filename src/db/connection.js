'use strict'

const mongoose = require('mongoose');

class DataBase {

    constructor({ config }) {
        this.config = config;
    }

    async connect() {
        return mongoose.connect(this.config.db.connString, {useNewUrlParser: true, useUnifiedTopology: true});
    }
}

module.exports = DataBase