'use strict'


class CollectionService {

    constructor({ groupRepository, collectionRepository }) {
        this.collectionRepository = collectionRepository;
        this.groupRepository = groupRepository;
    }

    async create(payload) {
        try {
            const group = await this.groupRepository.getById(payload.groupId);

            if (!group) {
                throw { status: 400, name: 'BadRequest' }
            }
            
            const collectionId = await this.collectionRepository.create(payload);
            const groupCollections = [...group.collections, collectionId];

            return await this.groupRepository.updateById(payload.groupId, { collections: groupCollections });
        } catch(e) {
            throw e;
        }
    }

    async getAll() {
        try {
            return await this.collectionRepository.find({});
        } catch(e) {
            throw e;
        }
    }

}

module.exports = CollectionService;