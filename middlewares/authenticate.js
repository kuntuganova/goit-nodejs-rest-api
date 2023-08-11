const jwt = require('jsonwebtoken');
const { RequestError } = require('../helpers');
const { User } = require('../models/user');
const SECRET_KEY = process.env;

async function authenticate(req, res, next) {
    try {
        const { authorization } = req.headers;
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer') {
            throw RequestError(401);
        }

        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            throw RequestError(401);
        }

        req.user = user;
        next();
    } catch (err) {
        if (!err.status) {
            err.status = 401;
            err.message = 'Unauthorized';
        }
        next(err);
    }
}

module.exports = authenticate;
