const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
require('dotenv').config();

const secret = process.env.SECRET;
const expiration = '8h';

module.exports = {
    authMiddleware: function ({req}) {
        let token = req.query.token || req.headers.authorization;
        
        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration});
            req.user = data;
            
        } catch {
            console.log('Invalid token');
        }
        return req;
    },
    signToken: function ({username, email, _id, first_name, last_name, role, status}) {
        const payload = { username, email, _id, first_name, last_name, role, status };

        // console.log('payload from server auth signToken() => ', payload)

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
    }
}