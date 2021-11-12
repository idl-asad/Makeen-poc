const revalidator = require('revalidator');

class RolePermission {

    constructor({ roles, validator, collectionRepository }) {
        this.roles = roles;
        this.validator = validator;
        this.collectionRepository = collectionRepository;

        this.canCreate = this.canCreate.bind(this);
    }
    

    canCreate(role) {
        return async (req, res, next) => {
            try {
                const payload = req.body;
                const { valid, errors } = revalidator.validate(payload, this.validator.CREATE_ITEM);
    
                if (!valid) {
                    next({ message: errors[0].message });
                }
    
                const collection = await this.collectionRepository.getById(payload.parentId);
                const groupRole = req.roles.find(obj => (obj.role === role) || (obj.groupId.toString() === collection.groupId.toString())) || {};
               
                if ([ role, this.roles.MANAGER ].includes(groupRole?.role)) {
                    next();
                } else {
                    next({ status: 403, name: 'AccessDenied' });
                }
            } catch(e) {
                next(e);
            }
        }
    }
}

module.exports = RolePermission;