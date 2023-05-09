import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($input: signupInput) {
    signup(input: $input) {
      token
      user {
        _id
        username
        email
        first_name
        last_name
        role
        status
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        first_name
        last_name
        role
        status
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileUpdateInput!) {
    updateProfile(input: $input) {
      _id
      username
      email
      first_name
      last_name
      role
      status
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      _id
      username
      email
      first_name
      last_name
      role
      status
    }
  }
`;

export const UPDATE_USER_ROLE_STATUS = gql`
  mutation UpdateUserStatusRole($input: UserRoleStatusUpdateInput!) {
    updateUserStatusRole(input: $input) {
      _id
      username
      email
      first_name
      last_name
      role
      status
    }
  }
`;

export const ADD_MENU_CATEGORY = gql`
  mutation AddMenuCategory($categoryName: String!) {
    addMenuCategory(category_name: $categoryName) {
      _id
      name
      menu {
        _id
        img
        name
        price
        category_id
      }
    }
  }
`;

export const UPDATE_MENU_CATEGORY = gql`
  mutation UpdateMenuCategory($categoryId: ID!, $categoryName: String!) {
    updateMenuCategory(category_id: $categoryId, category_name: $categoryName) {
      _id
      name
      menu {
        _id
        img
        name
        price
        category_id
      }
    }
  }
`;

export const DELETE_MENU_CATEGORY = gql`
  mutation DeleteMenuCategory($categoryId: ID!) {
    deleteMenuCategory(category_id: $categoryId)
  }
`;

export const ADD_MENU = gql`
  mutation AddMenu($input: addMenuInput!) {
    addMenu(input: $input) {
      _id
      img
      name
      price
      category_id
    }
  }
`;

export const UPDATE_MENU = gql`
  mutation UpdateMenu($input: updateMenuInput!) {
    updateMenu(input: $input) {
      _id
      img
      name
      price
      category_id
    }
  }
`;

export const DELETE_MENU = gql`
  mutation DeleteMenu($menuId: ID!) {
    deleteMenu(menu_id: $menuId)
  }
`;

export const SUBMIT_ORDER = gql`
mutation SubmitOrder($input: orderInput) {
  submitOrder(input: $input) {
    _id
    order_status
    customer_name
    cooking_status
    menu_items {
      menu {
        _id
        img
        name
        price
        category_id
        createdAt
        updatedAt
      }
      order_qty
    }
    total
    createdAt
    updatedAt
  }
}
`;

export const UPDATE_ORDER = gql`
mutation SubmitOrder($orderId: ID!, $orderStatus: String!) {
  updateOrder(order_id: $orderId, order_status: $orderStatus) {
    _id
    order_status
    customer_name
    cooking_status
    menu_items {
      menu {
        _id
        img
        name
        price
        category_id
        createdAt
        updatedAt
      }
      order_qty
    }
    total
    createdAt
    updatedAt
  }
}
`;

export const UPDATE_ORDERS = gql`
mutation UpdateOrders($orderId: [ID]!, $cookingStatus: String!, $orderStatus: String!) {
  updateOrders(order_id: $orderId, cooking_status: $cookingStatus, order_status: $orderStatus) {
    _id
    order_status
    customer_name
    cooking_status
    menu_items {
      menu
      order_qty
    }
    total
    createdAt
    updatedAt
  }
}
`

export const DELETE_ORDER = gql`
  mutation DeleteOrder($orderId: ID!) {
    deleteOrder(order_id: $orderId)
  }
`;
