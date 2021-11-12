'use strict'

const router = require('express').Router();

const { container } = require('di-setup');

const collectionController = container.resolve('collectionController');
const collectionPermissions = container.resolve('collectionPermissions');

const roles = container.resolve('roles');

router.post('/', collectionPermissions.canCreate(roles.GLOBALMANAGER), collectionController.create);
router.get('/', collectionController.getAll);

module.exports = router;