import pg from "pg";

const { Client } = pg;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "user" VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMP NOT NULL
);
`;

async function main() {
  const connectionString = process.argv[2];

  if (!connectionString) {
    console.error("Error: Please provide a connection URL as an argument.");
    console.log(
      "Connection URL example: postgresql://<role_name>:<role_password>@<db_host>:5432/<db_name>",
    );
    process.exit(1);
  }

  console.log("Seeding...");

  const { hostname } = new URL(connectionString);

  const sslConfig = ["localhost", "127.0.0.1"].includes(hostname)
    ? false
    : { rejectUnauthorized: false };

  const client = new Client({
    connectionString,
    ssl: sslConfig,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
