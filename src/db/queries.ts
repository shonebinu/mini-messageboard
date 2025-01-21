import pool from "./pool.js";

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

// since user is a keyword in Postgres, we need to wrap it around double quotes. Use a different field name in real world
async function insertMessage(user: string, text: string, added: Date) {
  await pool.query(
    `INSERT INTO messages ("user", text, added) VALUES ($1, $2, $3)`,
    [user, text, added],
  );
}

export default { getMessages, insertMessage };
