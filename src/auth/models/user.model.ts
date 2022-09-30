import { model } from "mongoose";
import UserSchema from "../schemas/user.schema";
import { UserData } from "../types/user-data.type";

export const User = model<UserData>("User", UserSchema);
