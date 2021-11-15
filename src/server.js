'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { container } = require('di-setup');

const Db = container.resolve('db');
const Jwt = container.resolve('jwt');
const Handler = container.resolve('handler');
const config = container.resolve('config');
const userRepository = container.resolve('userRepository');
const groupRepository = container.resolve('groupRepository');
const roles = container.resolve('roles');


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
            console.log(userRepository);
            await Db.connect();
            console.log("Connected successfully to Makeen db!");

            // migrating admin user
            
            const user = config.adminUser;
            const userCount = await userRepository.getUserCount();
            if (userCount < 1) {
                const roleId = await groupRepository.createRole({
                    role: roles.GLOBALMANAGER
                });
                user['roles'] = roleId;
                await userRepository.create(user);
            }
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