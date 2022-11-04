import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false}: false,
  logging: true,
  synchronize: false,
  entities:process.env.NODE_ENV === "production"? ["dist/src/entities/*.js"]: ["src/entities/*.ts"],
  migrations:  process.env.NODE_ENV === "production" ? ["dist/src/migrations/*.js"]:["src/migrations/*.ts"],
});

export default AppDataSource;
