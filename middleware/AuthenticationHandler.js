const jwt = require('jsonwebtoken');
const util = require('util');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {decode} = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.cookie;
        if (!authHeader || !authHeader.startsWith('token')) {
            throw new UnauthorizedError('Unauthorized user', 401);

        }

        const token = authHeader.split('=')[1];
        const verifyJwt = util.promisify(jwt.verify);
        const decoded = await verifyJwt(token, process.env.JWT_SECRET);
        console.log(decode)
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {verifyToken};
