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
{
          type: Number,
          // required: true,
        },
   
        s
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
