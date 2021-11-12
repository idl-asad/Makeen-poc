'use strict'

const router = require('express').Router();

const { container } = require('di-setup');

const groupController = container.resolve('groupController');
const userPermissions = container.resolve('userPermissions');
const groupPermissions = container.resolve('groupPermissions');

const roles = container.resolve('roles');

router.post('/', userPermissions.roleOnly(roles.GLOBALMANAGER), groupController.create);
router.post('/role', groupPermissions.canCreateGroupRole(roles.GLOBALMANAGER), groupController.createGroupRole)
router.get('/', groupController.getAll);


module.exports = router;