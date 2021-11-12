'use strict'

const config = {
    port: 8080,
    secret: 'w9izi1z430h681mi',
    saltWorkFactor: 10,
    db: {
        connString: 'mongodb://admin:Password1@db/makeen?authSource=admin'
    }
};

module.exports = config;