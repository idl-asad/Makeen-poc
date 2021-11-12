'use strict'

const mongoose = require('mongoose');

class CollectionRepository {

    constructor({ Collections }) {
        this.Collections = Collections;
    }

    async create(payload) {
        try {
            const collection = new this.Collections(payload);
            await collection.save();
            return collection._id;
        } catch(e) {
            throw e;
        }
    }

    async find(query) {
        try {
            return await this.Collections.find(query);
        } catch(e) {
            throw e;
        }
    }

    async updateById(id, payload) {
        return await this.Collections.findByIdAndUpdate(id, payload);
    }

    async getById(id) {
        try {
            return await this.Collections.findById(mongoose.Types.ObjectId(id))
        } catch(e) {
            throw { status: 404, name: 'NotFound' };
        };
    }
}

module.exports = CollectionRepository;