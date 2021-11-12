'use strict'

const { setup } = require('di-setup');
setup();

const config = require('config');
const Server = require('server');


const server = new Server();
server.setup().then(() => {
    server.run(config.port);
});
