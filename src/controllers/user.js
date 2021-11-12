'use strict'


const revalidator = require('revalidator');

class UserController {
    
    constructor({ userService, validator }) {
        this.userService = userService;
        this.validator = validator;

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
    }

    async login(req, res, next) {
        try {
            const payload = req.body;
            const { valid, errors } = revalidator.validate(payload, this.validator.LOGIN);
            
            if (!valid) {
                console.log(errors);
                throw errors[0].message;
            }
    
            await this.userService.authenticate(payload, res, next);
    
        } catch(e) {
            next(e);
        }
    }

    async register (req, res, next) {
        try {
            const payload = req.body;
            const { valid, errors } = revalidator.validate(payload, this.validator.REGISTER);
            
            if (!valid) {
                throw errors[0].message;
            }
    
            await this.userService.register(payload);
            res.json({message: 'User registered Successfully!'});
    
        } catch(e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const { id } = req.params;
            const user = await this.userService.get(id);
            res.json(user);
        } catch(e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const payload = req.body;
            const { valid, errors } = revalidator.validate(payload, this.validator.UPDATE_USER);
            
            if (!valid) {
                throw errors[0].message;
            }

            await this.userService.update(id, payload);
            res.json({message: 'User updated successfully!'});

        } catch(e) {
            next(e)
        }
    }
}

module.exports = UserController;