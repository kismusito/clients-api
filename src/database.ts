import mongoose from "mongoose";
import { CONFIG } from "./utils/config";

export default async function connect(): Promise<void> {
  try {
    mongoose.connect(CONFIG.DATABASE_URI);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
}
