'use strict'

const config = {
    port: 8080,
    secret: 'w9izi1z430h681mi',
    saltWorkFactor: 10,
    db: {
        connString: 'mongodb://admin:Password1@db/makeen?authSource=admin'
    },
    adminUser: {
        "email": "globalAdmin@makeen.com",
        "password": "Password1",
        "username": "globalAdmin",
        "firstName": "global",
        "lastName": "admin"
    }
};

module.exports = config;