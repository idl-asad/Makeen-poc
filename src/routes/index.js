'use strict'

const router = require('express').Router();
const user = require('routes/user');
const group = require('routes/group');
const collection = require('routes/collection');
const item = require('routes/item');

router.use('/', user);
router.use('/group', group);
router.use('/collection', collection),
router.use('/item', item)

module.exports = router;