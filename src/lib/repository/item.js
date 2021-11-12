'use strict'

const mongoose = require('mongoose');

class ItemRepository {

    constructor({ Items }) {
        this.Items = Items;
    }

    async create(payload) {
        try {
            const item = new this.Items(payload);
            await item.save();
            return item._id;
        } catch(e) {
            throw e;
        }
    }
}

module.exports = ItemRepository;