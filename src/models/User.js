import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // unique > 똑같은 email과 username이 있으면 안되기 때문
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  // socialOnly github로 만들어졌고 password가 없음
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});

// this는 create되는 User
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;
