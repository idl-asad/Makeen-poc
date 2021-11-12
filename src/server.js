'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { container } = require('di-setup');

const Db = container.resolve('db');
const Jwt = container.resolve('jwt');
const Handler = container.resolve('handler');

const router = require('routes')

class Server {

    constructor() {
        this.app = express();
    }

    async setup() {
        this.app.use(express.json());
        this.app.use(Jwt.auth());
        this.app.use('/api', router);
        this.app.use(Handler.error);

        try {
            await Db.connect();
            console.log("Connected successfully to Makeen db!");
        } catch (e) {
           throw Error(`Unable to connect with makeen Database ${e}`);
        }
    }

    async run(port) {
        this.server = this.app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    }

    stop(done) {
        this.server.close(done);
    }
}

module.exports = Server;