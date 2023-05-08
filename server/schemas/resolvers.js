const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const { User, MenuCategory, Menu, Order } = require("../models");
const {
  signToken,
  checkAdmin,
  checkFOHManager,
  checkKitchenManager,
} = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }
        const user = await User.findOne({ _id: context.user._id });
        // console.log("user => ", user);
        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getUsers: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        const { role, status } = context.user;

        if (role !== "Admin" && status !== "active") {
          throw new ForbiddenError("Unauthorized user");
        }

        const users = User.find({});
        return users;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getMenuCategory: async (parent, { category_id }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        const menuCategory = await MenuCategory.findById(category_id).populate(
          "menu"
        );
        return menuCategory;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getMenuCategories: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        const menuCategories = await MenuCategory.find({}).populate("menu");
        // console.log(menuCategories);
        return menuCategories;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getMenu: async (parent, { menu_id }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        const menu = await Menu.findById(menu_id);
        return menu;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getMenus: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }
        const menus = await Menu.find({});
        return menus;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getOrder: async (parent, { order_id }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        const order = await Order.findById(order_id);
        return order;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getOrders: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        const orders = await Order.find({});
        return orders;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  Mutation: {
    signup: async (parent, { input }, context) => {
      try {
        const {
          username,
          email,
          password,
          first_name,
          last_name,
          role,
          status,
        } = input;

        const newUser = await User.create({
          username,
          email,
          password,
          first_name,
          last_name,
          role,
          status,
        });
        const token = signToken(newUser);

        return { token, user: newUser };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    deleteUser: async (parent, { user_id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User is not logged in");
      }

      if (!user_id) {
        throw new Error("Input value is empty");
      }

      const { role, status } = context.user;

      if (role !== "Admin" && status !== "active") {
        throw new ForbiddenError("Unauthorized user");
      }

      const delUser = await User.deleteOne({ _id: user_id });

      return `Successfully deleted ${delUser.deletedCount} Order document`;
    },
    login: async (parent, { email, password }, context) => {
      try {
        const user = await User.findOne({ email });
        if (!email) {
          throw new AuthenticationError("User account not found.");
        }
        const verifiedPw = await user.isCorrectPassword(password);

        if (!verifiedPw) {
          throw new AuthenticationError("Incorrect password");
        }

        context.user = user;

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateProfile: async (parent, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error("User is not logged in");
        }

        if (Object.keys(input).length === 0) {
          throw new Error("Input object is empty");
        }
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          input,
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    changePassword: async (
      parent,
      { currentPassword, newPassword },
      context
    ) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        if (!currentPassword || !newPassword) {
          throw new Error("Input object is empty");
        }

        const user = await User.findById(context.user._id);
        const verifiedPw = await user.isCorrectPassword(currentPassword);

        if (!verifiedPw) {
          throw new Error("Invalid current password");
        }

        user.password = newPassword;
        await user.save();

        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateUserStatusRole: async (parent, { input }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }
        // TODO: must have another collection to store logs of updates (e.g. created_by, updated_by)?
        // Only admin user can update other users role and status, but other fields are off limit to the admin
        if (context.user.role !== "Admin") {
          throw new ForbiddenError("Unauthorized user");
        }

        const { user_id, user_status, user_role } = input;

        const updatedUser = await User.findOneAndUpdate(
          { _id: user_id },
          {
            status: user_status,
            role: user_role,
          },
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    addMenuCategory: async (parent, { category_name }, context) => {
      try {
        if (!context.user) {
          throw new Error("User is not logged in");
        }

        if (!category_name) {
          throw new Error("Input is blank");
        }

        // console.log("context.user from resolver =>", context.user);

        const { status, role } = context.user;

        if (role !== "Admin" && role !== "FOH Manager" && status !== "active") {
          throw new ForbiddenError("Unauthorized user");
        }

        // TODO: why aren't the following functions working?
        // checkAdmin(status, role);
        // checkFOHManager(status, role);

        // TODO: to move .pre("save") here instead
        const newMenuCategory = await MenuCategory.create({
          name: category_name,
        });

        return newMenuCategory;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateMenuCategory: async (
      parent,
      { category_id, category_name },
      context
    ) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        if (!category_id || !category_name || category_name === "") {
          throw new Error("Input value is blank");
        }
        const { role, status } = context.user;

        if (role !== "Admin" && role !== "FOH Manager" && status !== "active") {
          throw new ForbiddenError("Unauthorized user");
        }

        const updateMenuCategory = await MenuCategory.findOneAndUpdate(
          { _id: category_id },
          { name: category_name },
          { new: true }
        );

        return updateMenuCategory;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    deleteMenuCategory: async (parent, { category_id }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        if (!category_id) {
          throw new Error("Input is blank");
        }

        const { role, status } = context.user;

        if (role !== "Admin" && role !== "FOH Manager" && status !== "active") {
          throw new ForbiddenError("Unauthorized user");
        }

        const delMenuCategory = await MenuCategory.deleteOne({
          _id: category_id,
        });

        return `Successfully deleted ${delMenuCategory.deletedCount} Order document`;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    addMenu: async (parent, { input }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        if (Object.keys(input).length === 0) {
          throw new Error("Inpu Object is empty");
        }

        const { img, name, price, category_id } = input;
        // console.log("img =>", img);

        const { role, status } = context.user;

        if (role !== "Admin" && role !== "FOH Manager" && status !== "active") {
          throw new ForbiddenError("Unauthorized user");
        }

        const newMenu = await Menu.create({
          img,
          name,
          price,
          category_id,
        });

        return newMenu;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateMenu: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User is not logged in");
      }
      if (Object.keys(input).length === 0) {
        throw new Error("Object input is empty");
      }

      const { menu_id, img, name, price } = input;
      const { role, status } = context.user;

      if (role !== "Admin" && role !== "FOH Manager" && status !== "active") {
        new ForbiddenError("Unauthorized user");
      }

      const menu = await Menu.findById(menu_id);

      if (img === menu.img && name === menu.name && price == menu.price) {
        return {
          message: "No update needed",
        };
      }

      if (img) {
        menu.img = img;
      }

      if (name) {
        menu.name = name;
      }

      if (price) {
        menu.price = price;
      }

      const updatedMenu = await menu.save();
      return updatedMenu;
    },
    deleteMenu: async (parent, { menu_id }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }
        if (!menu_id) {
          throw new Error("Input value is blank");
        }

        const { role, status } = context.user;

        if (role !== "Admin" && role !== "FOH Manager" && status !== "active") {
          throw new ForbiddenError("Unauthorized user");
        }

        const delMenu = await Menu.deleteOne({ _id: menu_id });

        return `Successfully deleted ${delMenu.deletedCount} Menu document`;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    submitOrder: async (parent, { input }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        if (Object.keys(input).length === 0) {
          throw new Error("Input object is empty");
        }

        const { role, status } = context.user;

        if (role !== "FOH Manager" && role !== "Admin" && status !== "active") {
          throw new ForbiddenError("Unauthorized user");
        }

        const { order_status, customer_name, cooking_status, menu_items, total } =
          input;

        const newOrder = await Order.create({
          order_status,
          customer_name,
          cooking_status,
          menu_items,
          total,
        });

        return newOrder;

        // TODO: send notification to the Kitchen + automatically update Kitchen Orders
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateOrder: async (parent, { order_id, order_status, cooking_status }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("User is not logged in");
        }

        const { role, status } = context.user;

        if (role !== "Admin" && role !== "FOH Manager" && status !== "active") {
          throw new ForbiddenError("Unauthorized user");
        }

        const updatedOrder = await Order.findByIdAndUpdate(
          { _id: order_id },
          { order_status },
          { new: true }
        );

        return updatedOrder;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    deleteOrder: async (parent, { order_id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User is not logged in");
      }

      if (!order_id) {
        throw new Error("Input value is blank");
      }

      // checkAdmin(context);
      // checkFOHManager(context);

      const { status, role } = context.user;

      if (role !== "Admin" && role !== "FOH Manager" && status !== "active") {
        throw new ForbiddenError("Unauthorized user");
      }

      const delOrder = await Order.deleteOne({ _id: order_id });

      return `Successfully deleted ${delOrder.deletedCount} Order document`;
    },
  },
};

module.exports = resolvers;
