'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const config = require('config');

const SALT_WORK_FACTOR = config.saltWorkFactor;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    roles: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' }
    ]
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

UserSchema.pre('save', function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) return next();
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } catch(e) {
        throw e;
    }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    console.log(candidatePassword);
    console.log(this.password);
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("Users", UserSchema);
