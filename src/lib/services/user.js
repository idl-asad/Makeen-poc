'use strict'


const jwt = require('jsonwebtoken');

class UserService {

    constructor({ userRepository, config }) {
        this.userRepository = userRepository;
        this.config = config;
    }

    async authenticate({ username, password }, res, next) {
        try {
            let result;
            const errMsg = 'username or password incorrect!';
            const user = await this.userRepository.findByQuery({ username });
            if (!user) {
                return next(errMsg);
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return next(err);
                }

                if (!isMatch) {
                    return next(errMsg);
                }

                const accessToken = jwt.sign({ sub: user.id }, this.config.secret, { expiresIn: '7d' });
                return res.json({
                    accessToken
                });
            });

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    async register(payload) {
        try {
            const existUser = await this.userRepository.findByQuery({ $or: [{ username: payload.username }, { email: payload.email }] });

            if (existUser && existUser.username === payload.username) {
                throw new Error(`Username ${payload.username} already exist!`);
            } else if (existUser && existUser.email === payload.email) {
                throw new Error(`User is already registered with given email!`);
            }

            this.userRepository.create(payload);
        } catch (e) {
            throw e;
        }
    }

    async get(id) {
        try {
            return await this.userRepository.getById(id);
        } catch(e) {
            throw e;
        }
    }

    async update(id, payload) {
        try {
            const user = await this.userRepository.getById(id);
            console.log(user)
            if (!user) {
                throw new Error({ status: 404, message: 'USER_NOT_FOUND' });
            }

            return await this.userRepository.updateById(id, payload);
        } catch(e) {
            throw e
        }
    }
}

module.exports = UserService;