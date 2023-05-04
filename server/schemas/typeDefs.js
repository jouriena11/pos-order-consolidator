const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        first_name: String!
        last_name: String!
        role: String!
        status: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type MenuCategory {
        _id: ID!
        name: String!
        menus: [Menu]
    }

    type Menu {
        _id: ID!
        img: String
        name: String!
        price: Float!
        category_id: ID!
    }

    type Query {
        getUser: User
        getUsers: [User]
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!, first_name: String!, last_name: String!, role: String, status: String): Auth
        login(email: String!, password: String! ): Auth
        updateProfile(input: ProfileUpdateInput!): User
        changePassword(currentPassword: String!, newPassword: String!): User
        updateUserStatusRole(input: UserRoleStatusUpdateInput!): User
        addMenuCategory(category_name: String!): MenuCategory
        updateMenuCategory(category_id: ID!, category_name: String!): MenuCategory
        deleteMenuCategory(category_id: ID!): MenuCategory
        addMenu(input: addMenuInput!): Menu
        updateMenu(input: updateMenuInput!): Menu
        deleteMenu(menu_id: ID!): String
    }

    input addMenuInput {
        img: String
        name: String!
        price: Float!
        category_id: ID!
    }

    input updateMenuInput {
        menu_id: ID!
        img: String
        name: String
        price: Float
        category_id: ID
    }

    input UserRoleStatusUpdateInput {
        user_id: ID!
        user_status: String!
        user_role: String!
    }

    input ProfileUpdateInput {
        username: String
        email: String
        first_name: String
        last_name: String
        role: String
        status: String
    }
`

// TODO: Below is a reference for frontend codes
// input ProfileUpdate:
// admin can only update first_name, last_name, role, and status
// FOH and Kitchen users can only update username and email

module.exports = typeDefs;