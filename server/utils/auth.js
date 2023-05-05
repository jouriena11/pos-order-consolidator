const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
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
  checkAdmin: function ({ context }) {
    const { role, status } = context.user;
    if (role !== "Admin" && status !== "active") {
      throw new ForbiddenError("Unauthorized user");
    }
  },
  checkFOHManager: function ({ context }) {
    const { role, status } = context.user;
    if (role !== "FOH Manager" && status !== "active") {
      throw new ForbiddenError("Unauthorized user");
    }
  },
  checkKitchenManager: function ({ context }) {
    const { role, status } = context.user;
    if (role !== "Kitchen Manager" && status !== "active") {
      throw new ForbiddenError("Unauthorized user");
    }
  },
};
