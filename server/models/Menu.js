const { Schema, model } = require("mongoose");
const MenuCategory = require("./MenuCategory");

const menuSchema = new Schema(
  {
    img: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number, // Int doesn't support decimal places
      required: true,
      min: 0,
      validate: {
        validator: (value) => {
          return value >= 0;
        },
        message: "Price cannot be a negative number.",
      },
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true,
    },
  },
  { timestamps: true },
  {
    toJSON: {
      getters: true, // to decide later if there's a use for it
      virtuals: true, // to decide later if there's a use for it
    },
  }
);

menuSchema.pre("save", async function (next) {
  const menuName = this.name;
  const wordArr = menuName.split(" ");
  const capitalizedWord = wordArr.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  this.name = capitalizedWord.join(" ");
  return next();
});

menuSchema.post("save", async function (next) {
  try {
    const { _id, category_id } = this;
    console.log("post menu");
    const updatedMenuCategory = await MenuCategory.findOneAndUpdate(
      { _id: category_id },
      { $push: { menu: _id } },
      { new: true, upsert: true }
    );
  } catch (err) {
    console.error(err);
  }
});

const Menu = model("Menu", menuSchema);

module.exports = Menu;
