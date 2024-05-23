import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  db_url: process.env.DB_URL,
};
