import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new Pool({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "127.0.0.1",
    database: "freights",
    password: process.env.PG_PASSWORD || "",
    port: Number(process.env.PG_PORT || 5432),
})

export default db;