
'use strict'


class CollectionController {
    
    constructor({ collectionService, validator, collectionPermissions }) {
        this.collectionService = collectionService;
        this.validator = validator;
        this.collectionPermissions = collectionPermissions;

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    async create(req, res, next) {
        try { 
            await this.collectionService.create(req.body);
            res.json({message: 'Collection Created Successfullyl!'});

        } catch(e) {
            next(e);
        }
    };

    async getAll(req, res, next) {
        try {
            const collections =  await this.collectionService.getAll();
            res.json(this.collectionPermissions.scopedCollections(req.roles, collections));
        } catch(e) {
            next(e);
        }
    }
}

module.exports = CollectionController;