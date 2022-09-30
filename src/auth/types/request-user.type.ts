import { Request } from "express";
import { UserData } from "./user-data.type";

export interface RequestUser extends Request {
  user: UserData;
}
