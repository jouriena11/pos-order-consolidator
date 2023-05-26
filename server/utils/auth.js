const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
require("dotenv").config();

const secret = process.env.SECRET;
const expiration = "8h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
    return req;
  },
  signToken: function ({
    username,
    email,
    _id,
    first_name,
    last_name,
    role,
    status,
  }) {
    const payload = {
      username,
      email,
      _id,
      first_name,
      last_name,
      role,
      status,
    };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // Note: checkLogin shouldn't be merged into checkRole as each function is responsible for a different task
  checkLogin: function (context) {
    if (!context.user) {
      throw new AuthenticationError("User is not logged in");
    }
  },
  checkRole: function (context, roleList) {
    const { role, status } = context.user;

    if(!roleList.includes(role) || status !== "active") {
      throw new ForbiddenError("Unauthorized user");
    }

  }
};
