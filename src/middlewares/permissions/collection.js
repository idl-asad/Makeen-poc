const revalidator = require('revalidator');

class CollectionPermission {

    constructor({ roles, validator }) {
        this.roles = roles;
        this.validator = validator;
    }
    

    canCreate(role) {
        return (req, res, next) => {
            const payload = req.body;
            const { valid, errors } = revalidator.validate(payload, this.validator.CREATE_COLLECTION);

            if (!valid) {
                next({ message: errors[0].message });
            }

            const groupRole = req.roles.find(obj => (obj.role === role) || (obj.groupId === payload.groupId)) || {};
            
            if (groupRole?.role === role || groupRole?.role === this.roles.MANAGER) {
                next();
            } else {
                next({ status: 403, name: 'AccessDenied' });
            }
        }
    }


    scopedCollections(userRoles, collections) {
        if (userRoles.find(obj => obj.role === this.roles.GLOBALMANAGER)) {
            return collections;
        } else {
            const groupAccess = new Object();
            userRoles.forEach(role =>  groupAccess[role.groupId] = role );
            const filteredCollections = collections.filter(collection => {
                const collectionGroupId = collection.groupId.toString();
                if (groupAccess[collectionGroupId] && groupAccess[collectionGroupId].role === this.roles.MANAGER) {
                    return collection
                }
            });
            return filteredCollections;
        }
    }
}

module.exports = CollectionPermission;