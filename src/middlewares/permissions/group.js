const revalidator = require('revalidator');

class GroupPermission {

    constructor({ roles, validator }) {
        this.roles = roles;
        this.validator = validator;
    }
    
    scopedGroups(userRoles, groups) {
        if (userRoles.find(obj => obj.role === this.roles.GLOBALMANAGER)) {
            return groups;
        } else {
            const groupAccess = new Object();
            userRoles.forEach(role =>  groupAccess[role.groupId] = role );
            const filteredGroups = groups.filter(group => {
                if (groupAccess[group.id] && groupAccess[group.id] === this.roles.MANAGER) {
                    return group
                }
            });
            return filteredGroups;
        }
    }

    canCreateGroupRole(role) {
        return (req, res, next) => {

            const payload = req.body;
            const { valid, errors } = revalidator.validate(payload, this.validator.CREATE_GROUP_ROLE);

            if (!valid) {
                next({ message: errors[0].message });
            }

            const groupRole = req.roles.find(obj => (obj.role === role) || (obj.groupId === payload.groupId)) || {};
            
            if (groupRole?.role === role || 
                (groupRole?.role === this.roles.MANAGER && [this.roles.MANAGER, this.roles.REGULAR].includes(payload.role))) {
                next();
            } else {
                next({ status: 403, name: 'AccessDenied' });
            }
        }
    }
}

module.exports = GroupPermission;