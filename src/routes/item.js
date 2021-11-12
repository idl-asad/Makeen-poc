'use strict'

const router = require('express').Router();

const { container } = require('di-setup');

const itemController = container.resolve('itemController');
const itemPermissions = container.resolve('itemPermissions');

const roles = container.resolve('roles');

router.post('/', itemPermissions.canCreate(roles.GLOBALMANAGER), itemController.create);

module.exports = router;