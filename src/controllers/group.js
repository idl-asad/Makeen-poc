
'use strict'


const revalidator = require('revalidator');

class GroupController {
    
    constructor({ groupService, validator, groupPermissions }) {
        this.groupService = groupService;
        this.validator = validator;
        this.groupPermissions = groupPermissions;

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.createGroupRole = this.createGroupRole.bind(this);
    }

    async create(req, res, next) {
        try {
            const payload = req.body;
            const { valid, errors } = revalidator.validate(payload, this.validator.CREATE_GROUP);
            
            if (!valid) {
                throw errors[0].message;
            }

            await this.groupService.create(payload);
            res.json({message: 'Group Created Successfullyl!'});

        } catch(e) {
            next(e);
        }
    };

    async getAll(req, res, next) {
        try {
            const groups = await this.groupService.getAll();
            res.json(this.groupPermissions.scopedGroups(req.roles, groups));
        } catch (e) {
            next(e);
        }
    }

    async createGroupRole(req, res, next) {
        try {
            const payload = req.body;
            res.json(await this.groupService.createGroupRole(payload));
        } catch (e) {
            next(e);
        }
    }

}

module.exports = GroupController;