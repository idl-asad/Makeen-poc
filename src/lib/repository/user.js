'use strict'

const mongoose = require('mongoose');

class UserRepository {

    constructor({ Users }) {
        this.Users = Users;
    }

    async findByQuery(query) {
        try {
            const user = await this.Users.findOne(query);
            return user
        } catch (e) {
            throw new Error(e);
        }
    }

    async create(payload) {
        try {
            const user = new this.Users(payload);
            await user.save();
            return user._id;
        } catch(e) {
            throw e;
        }
    }

    async getById(id) {
        try {
            return await this.Users.findById(mongoose.Types.ObjectId(id))
        } catch(e) {
            throw { status: 404, name: 'UserNotFound' };
        };
    }

    async getByIdWithRoles(id) {
        return await this.Users.findById(id).populate('roles');
    }

    async updateById(id, payload) {
        return await this.Users.findByIdAndUpdate(id, payload);
    }

    async getUserCount(query = {}) {
        return await this.Users.count(query);
    }

}

module.exports = UserRepository;