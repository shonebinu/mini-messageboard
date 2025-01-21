import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const { DB_NAME, DB_ROLE, DB_PASS, DB_HOST, DB_PORT } = process.env;

export default new Pool({
  connectionString: `postgresql://${DB_ROLE}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
});
