'use strict';

const expressJwt = require('express-jwt');


class Jwt {
    
    constructor({config, userRepository}) {
        this.config = config;
        this.userRepository = userRepository;

        this.auth = this.auth.bind(this);
        this.isRevoked = this.isRevoked.bind(this);
    }

    auth() {
        const secret = this.config.secret;
        return expressJwt({ secret, algorithms: ['HS256'], isRevoked: this.isRevoked }).unless({
            path: [
                '/api/login'
            ]
        });
    }

    async isRevoked(req, payload, done) {
        const user = await this.userRepository.getByIdWithRoles(payload.sub);
    
        // revoke token if user no longer exists
        if (!user) {
            return done(null, true);
        }
        req.roles = user.roles; 
        done();
    };
}

module.exports = Jwt;

