import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    orders: [
      {
        name: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
          default: "Pending",
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          // required: true,
        },
        spicyOrNonSpicy: {
          type: String,
          required: true,
        },
        vegOrNonVeg: {
          type: String,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
        ingredients: [
          {
            name: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            quantity: {
              type: Number,
              // required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
