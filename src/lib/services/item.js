'use strict'


class ItemService {

    constructor({ itemRepository, collectionRepository }) {
        this.collectionRepository = collectionRepository;
        this.itemRepository =  itemRepository;
    }

    async create(payload) {
        try {
            const collection = await this.collectionRepository.getById(payload.parentId);
            
            if (!collection) {
                throw { status: 400, name: 'BadRequest' }
            }

            const itemId = await this.itemRepository.create(payload);
            const collectionItems = [...collection.items, itemId];
            
            return await this.collectionRepository.updateById(payload.parentId, { items: collectionItems });
        } catch(e) {
            throw e;
        }
    }

}

module.exports = ItemService;