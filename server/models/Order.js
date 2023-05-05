const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    order_status: {
      type: String,
      required: true,
      default: "On Queue",
      enum: ["On Queue", "Ready", "Served", "Cancelled"],
    },
    customer_name: {
      type: String,
      trim: true,
      default: "Walk-in",
    },
    cooking_status: {
      type: String,
      required: true,
      default: "On Queue",
      enum: ["On Queue", "Cooking", "Ready", "Cancelled"],
    },
    menu_items: [
      {
        menu: {
          type: Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        order_qty: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
        type: Number,
        required: true,
        min: 0
    }
  },
  { timestamps: true },
  {
    toJSON: {
      getters: true, // to decide later if there's a use for it
      virtuals: true, // to decide later if there's a use for it
    },
  }
);

// TODO: Mongoose aggregation function -- line item total, subtotal, discount_flat, GST, total
// TODO: Stripe -- payment_method, payment_status

const Order = model("Order", orderSchema);

module.exports = Order;
