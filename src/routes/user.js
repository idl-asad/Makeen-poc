'use strict'

const router = require('express').Router();

const { container } = require('di-setup');

const userController = container.resolve('userController');
const userPermissions = container.resolve('userPermissions');
const roles = container.resolve('roles');

router.post('/register', userPermissions.roleOnly(roles.GLOBALMANAGER), userController.register);
router.post('/login', userController.login);
router.get('/user/:id', userPermissions.roleAndSelfOnly(roles.GLOBALMANAGER), userController.get);
router.put('/user/:id', userPermissions.roleAndSelfOnly(roles.GLOBALMANAGER), userController.update);

module.exports = router;