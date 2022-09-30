import * as dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 3001,
  API_ROUTE: `/api/v${process.env.API_VERSION || "1.0"}`,
  DATABASE_URI: process.env.DATABASE_URI || "",
  PRIVATE_KEY: process.env.PRIVATE_KEY,
};
