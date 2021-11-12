'use strict'


class GroupService {

    constructor({ groupRepository, userRepository }) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    async create(payload) {
        try {
            return await this.groupRepository.create(payload);
        } catch(e) {
            throw e;
        }
    }

    async getAll() {
        try {
            return await this.groupRepository.find({});
        } catch(e) {
            throw e;
        }
    }

    async createGroupRole(payload) {
        try {
            const user = await this.userRepository.getById(payload.userId);
            const roleId = await this.groupRepository.createRole(payload);
            user.roles.push(roleId);
            await this.userRepository.updateById(user.id, { roles: user.roles });
            return roleId;
        } catch(e) {
            throw e;
        }
    }

}

module.exports = GroupService;