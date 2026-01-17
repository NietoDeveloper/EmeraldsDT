import mongoose from "mongoose";

const subAdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  orderPermission: {
    type: Boolean,
    default: false,
  },
  userPermission: {
    type: Boolean,
    default: false,
  },
  marchandisePermission: {
    type: Boolean,
    default: false,
  },
  newsPermission: {
    type: Boolean,
    default: false,
  },
  ingrdientPermission: {
    type: Boolean,
    default: false,
  },
});

const SubAdmin = mongoose.model("SubAdmin", subAdminSchema);

export default SubAdmin;
