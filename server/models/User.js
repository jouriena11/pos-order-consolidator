const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: "TBA", // to be assigned
      enum: ["TBA", "FOH Manager", "Kitchen Manager", "Admin"],
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "active", "inactive"],
    },
  },
  { timestamps: true }, // createdAt, updatedAt
  {
    toJSON: {
      getters: true, // to decide later if there's a use for it
      virtuals: true, // to decide later if there's a use for it
    },
  }
);

userSchema.pre("save", async function (next) {
  // TODO: to create another 'collection' for logging
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);

module.exports = User;
