'use strict'

const awilix = require('awilix');
const config = require('config');
const db = require('db/connection');

const jwt = require('middlewares/jwt');
const handler = require('middlewares/handler');
const userPermissions = require('middlewares/permissions/user');
const groupPermissions = require('middlewares/permissions/group');
const collectionPermissions = require('middlewares/permissions/collection');
const itemPermissions = require('middlewares/permissions/item');

const {
    Users,
    Roles,
    Groups,
    Items,
    Collections
} = require('models');

const {
    userController,
    groupController,
    collectionController,
    itemController
} = require('controllers');

const { 
    userService,
    groupService,
    collectionService,
    itemService
 } = require('lib/services');

 const {
    userRepository,
    groupRepository,
    collectionRepository,
    itemRepository
 } = require('lib/repository');

const { validator, roles } = require('lib/constants');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
    container.register({

        // Config
        config: awilix.asValue(config),

        // Middlewares
        jwt: awilix.asClass(jwt),
        handler: awilix.asClass(handler),
        userPermissions: awilix.asClass(userPermissions),
        groupPermissions: awilix.asClass(groupPermissions),
        collectionPermissions: awilix.asClass(collectionPermissions),
        itemPermissions: awilix.asClass(itemPermissions),

        // Database
        db: awilix.asClass(db),

        // Models,
        Users: awilix.asValue(Users),
        Groups: awilix.asValue(Groups),
        Items: awilix.asValue(Items),
        Roles: awilix.asValue(Roles),
        Collections: awilix.asValue(Collections),

        // Constants
        validator: awilix.asValue(validator),
        roles: awilix.asValue(roles),

        // Controllers
        userController: awilix.asClass(userController),
        groupController: awilix.asClass(groupController),
        collectionController: awilix.asClass(collectionController),
        itemController: awilix.asClass(itemController),

        // Services
        userService: awilix.asClass(userService),
        groupService: awilix.asClass(groupService),
        collectionService: awilix.asClass(collectionService),
        itemService: awilix.asClass(itemService),

        // Repositories
        userRepository: awilix.asClass(userRepository),
        groupRepository: awilix.asClass(groupRepository),
        collectionRepository: awilix.asClass(collectionRepository),
        itemRepository: awilix.asClass(itemRepository),
    });
}

module.exports = {
    container,
    setup,
};
