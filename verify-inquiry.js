require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({ host: process.env.PGHOST, port: Number(process.env.PGPORT), database: process.env.PGDATABASE, user: process.env.PGUSER, password: process.env.PGPASSWORD });

(async () => {
  const email = "verify-" + Date.now() + "@example.com";
  const payload = {
    full_name: "Verification User",
    email,
    mobile: "1234567890",
    course: "Piano",
    message: "Verify DB insert",
  };

  const response = await fetch("http://localhost:5000/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("HTTP", response.status, await response.text());

  const result = await pool.query(
    "SELECT id, full_name, email, mobile, course, message FROM inquiries WHERE email = $1",
    [email]
  );

  console.log(JSON.stringify(result.rows, null, 2));
  await pool.end();
})();
