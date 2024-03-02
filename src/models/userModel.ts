import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// interface User extends Document{
//     password: string
// }

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "please provide the first Name"],
  },
  lastName: {
    type: String,
    required: [true, "please provide the last Name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lower: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    select: false,
    minlength: 8,
  },
  // passwordConfirm: {
  //     type: String,
  //     required: [true, 'Please confirm password'],
  //     validate:{
  //         validator: function( val: string){
  //             return val === this.password
  //         }
  //     }
  // }
});
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
// userSchema.methods.checkLoginPassword = async (
//   loginPassword: string,
//   registeredPassword: string
// ) => {
//   return await bcrypt.compare(loginPassword, registeredPassword);
// };
const User = model("User", userSchema);
export default User;
