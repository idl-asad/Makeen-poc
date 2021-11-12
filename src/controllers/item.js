
'use strict'


class ItemController {
    
    constructor({ itemService, validator }) {
        this.itemService = itemService;
        this.validator = validator;

        this.create = this.create.bind(this);
    }

    async create(req, res, next) {
        try { 
            await this.itemService.create(req.body);
            res.json({message: 'Item Created Successfullyl!'});

        } catch(e) {
            next(e);
        }
    };
}

module.exports = ItemController;