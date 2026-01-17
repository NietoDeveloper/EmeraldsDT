import mongoose from "mongoose";

const subAdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,

});

const SubAdmin = mongoose.model("SubAdmin", subAdminSchema);

export default SubAdmin;
