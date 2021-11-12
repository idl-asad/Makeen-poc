'use strict'

print('Start #################################################################');

db = db.getSiblingDB('makeen');

db.createUser({
    user: 'root',
    pwd: 'Password11',
    roles: [
        {
            role: 'readWrite',
            db: 'makeen',
        },
    ],
});

print('END #################################################################');
