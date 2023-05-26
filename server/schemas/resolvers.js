const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const { User, MenuCategory, Menu, Order } = require("../models");
const {
  signToken,
  checkLogin,
  checkRole,
} = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      try {
        checkLogin(context)
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
        checkLogin(context);
        checkRole(context, "Admin");

        const users = User.find({});
        return users;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getMenuCategory: async (parent, { category_id }, context) => {
      try {
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]);

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
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]);

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
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]);

        const menu = await Menu.findById(menu_id);
        return menu;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getMenus: async (parent, args, context) => {
      try {
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]);

        const menus = await Menu.find({});
        return menus;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getOrder: async (parent, { order_id }, context) => {
      try {
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]);

        const order = await Order.findById(order_id);
        return order;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getOrders: async (parent, args, context) => {
      console.log('begin');
      try {
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager", "Kitchen Manager"]);
        const orders = await Order.find({}).populate({
          path: 'menu_items.menu'
        });
        console.log('pass2');
        console.log(orders);
        return orders;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  Mutation: {
    signup: async (parent, { input }) => {
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
      
      checkLogin(context);
      checkRole(context, "Admin")

      if (!user_id) {
        throw new Error("Input value is empty");
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
        checkLogin(context);

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
    changePassword: async (parent, { currentPassword, newPassword },context) => {
      try {
        checkLogin(context);

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
        checkLogin(context);
        checkRole(context, "Admin");

        // TODO: must have another collection to store logs of updates (e.g. created_by, updated_by)?

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

        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]);

        if (!category_name) {
          throw new Error("Input is blank");
        }

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
    updateMenuCategory: async (parent, { category_id, category_name }, context) => {
      try {
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"])

        if (!category_id || !category_name || category_name === "") {
          throw new Error("Input value is blank");
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
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"])

        if (!category_id) {
          throw new Error("Input is blank");
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
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"])

        if (Object.keys(input).length === 0) {
          throw new Error("Inpu Object is empty");
        }

        const { img, name, price, category_id } = input;
        // console.log("img =>", img);

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
      checkLogin(context);
      checkRole(context, ["Admin", "FOH Manager"])

      if (Object.keys(input).length === 0) {
        throw new Error("Object input is empty");
      }

      const { menu_id, img, name, price } = input;

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
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"])
        if (!menu_id) {
          throw new Error("Input value is blank");
        }

        const delMenu = await Menu.deleteOne({ _id: menu_id });

        return `Successfully deleted ${delMenu.deletedCount} Menu document`;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    submitOrder: async (parent, { input }, context) => {

      // console.log('input', input)

      try {
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]);

        if (Object.keys(input).length === 0) {
          throw new Error("Input object is empty");
        }

        const { order_status, customer_name, cooking_status, menu_items, total } =
          input;

        let newOrder = await Order.create({
          order_status,
          customer_name,
          cooking_status,
          menu_items,
          total,
        });

        // TODO: to review
        newOrder = newOrder.populate({
          path: 'menu_items.menu'
        });

        return newOrder;

        // TODO: to send notification to the Kitchen + automatically update Kitchen Orders
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateOrder: async (parent, { order_id, order_status, cooking_status }, context) => {
      try {
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]); // TODO: to review if Kitchen Manager should be authorized to execute this function

        let updatedOrder = await Order.findByIdAndUpdate(
          { _id: order_id },
          { order_status },
          { new: true }
        );

        updatedOrder = updatedOrder.populate({
          path: 'menu_items.menu'
        });

        return updatedOrder;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateOrders: async (parent, { order_id, order_status, cooking_status }, context) => {
      try {
        checkLogin(context);
        checkRole(context, ["Admin", "FOH Manager"]); // TODO: to review if Kitchen Manager should be authorized to execute this function

        const updatedOrder = await Order.updateMany(
          { _id: { $in: order_id} },
          { order_status, cooking_status },
          { new: true }
        );

        return `${updatedOrder.deletedCount} orders documents have been updated`;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    deleteOrder: async (parent, { order_id }, context) => {
      checkLogin(context);
      checkRole(context, ["Admin", "FOH Manager"]);

      if (!order_id) {
        throw new Error("Input value is blank");
      }

      const delOrder = await Order.deleteOne({ _id: order_id });

      return `Successfully deleted ${delOrder.deletedCount} Order document`;
    },
  },
};

module.exports = resolvers;
