'use strict';

class Handler {
    
    constructor() {
        this.error = this.error.bind(this);
    }

    error(err, req, res, next) {
        if (typeof (err) === 'string') {
            return res.status(400).json({ message: err });
        }
    
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
    
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({ message: 'Invalid Token' });
        }

        if (err.name === 'AccessDenied') {
            return res.status(403).json({ message: 'Access Denied' });
        }

        if (err.name === 'NotFound') {
            return res.status(404).json({ message: 'Not Found!' });
        }

        if (err.name === 'BadRequest') {
            return res.status(404).json({ message: 'Bad Request!' });
        }
    
        // default to 500 server error
        return res.status(500).json({ message: err.message });
    }
}

module.exports = Handler;
