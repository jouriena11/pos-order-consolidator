import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    getUser {
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

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
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

export const GET_MENU_CATEGORY = gql`
  query GetMenuCategory($categoryId: ID!) {
    getMenuCategory(category_id: $categoryId) {
      _id
      name
      menu {
        _id
        img
        name
        price
      }
    }
  }
`;

export const GET_MENU_CATEGORIES = gql`
  query GetMenuCategories {
    getMenuCategories {
      _id
      name
      menu {
        _id
        img
        name
        price
      }
    }
  }
`;

export const GET_MENU = gql`
  query GetMenu($menuId: ID!) {
    getMenu(menu_id: $menuId) {
      _id
      img
      name
      price
      category_id
    }
  }
`;

export const GET_MENUS = gql`
  query GetMenus {
    getMenus {
      _id
      img
      name
      price
      category_id
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($orderId: ID!) {
    getOrder(order_id: $orderId) {
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
`;

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
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
`;
