'use strict'

const mongoose = require('mongoose');

class GroupRepository {

    constructor({ Groups, Roles }) {
        this.Groups = Groups;
        this.Roles = Roles;
    }

    async create(payload) {
        try {
            const group = new this.Groups(payload);
            return await group.save();
        } catch(e) {
            throw e;
        }
    }
    
    async find(query) {
        try {
            return await this.Groups.find(query);
        } catch(e) {
            throw e;
        }
    }

    async createRole(payload) {
        try {
            const role = new this.Roles(payload);
            await role.save();
            return role._id;
        } catch(e) {
            throw e;
        }
    }

    async getById(id) {
        try {
            return await this.Groups.findById(mongoose.Types.ObjectId(id))
        } catch(e) {
            throw { status: 404, name: 'NotFound' };
        };
    }

    async updateById(id, payload) {
        return await this.Groups.findByIdAndUpdate(id, payload);
    }
}

module.exports = GroupRepository;