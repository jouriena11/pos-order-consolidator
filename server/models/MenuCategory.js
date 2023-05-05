const { Schema, model } = require("mongoose");
const Menu = require('./Menu');

const menuCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    menu: [{
      type: Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    }]
  },
  { timestamps: true },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// TODO: to move this to resolvers instead
menuCategorySchema.pre("save", async function (next) {
  const categoryName = this.name;
  const wordArr = categoryName.split(" ");
  const capitalizedWord = wordArr.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  this.name = capitalizedWord.join(" ");
  return next();
})

const MenuCategory = model("MenuCategory", menuCategorySchema);

module.exports = MenuCategory;
