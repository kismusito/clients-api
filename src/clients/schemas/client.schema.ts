import { Schema } from "mongoose";
import { ClientData } from "../types/client-data.type";

export const ClientSchema = new Schema<ClientData>({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  document: {
    type: String,
    require: true,
    unique: true,
  },
  bankAccount: {
    type: String,
    require: true,
  },
});
