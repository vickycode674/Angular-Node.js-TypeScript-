import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  password: string;
  role: "General User" | "Admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["General User", "Admin"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
