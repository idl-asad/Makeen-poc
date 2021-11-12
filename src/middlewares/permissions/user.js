
class UserPermission {

    roleOnly(role) {
        return (req, res, next) => {
            const isAllowed = req.roles.find(obj => obj.role === role);
            
            if (isAllowed) {
                next();
            } else {
                next({ status: 403, name: 'AccessDenied' });
            }
        }
    }

    roleAndSelfOnly(role) {
        return (req, res, next) => {
            const { id } = req.params;
            
            if (req.user.sub === id || req.roles.find(obj => obj.role === role)) {
                next();
            } else {
                next({ status: 403, name: 'AccessDenied' });
            }
            
        } 
    }
}

module.exports = UserPermission;