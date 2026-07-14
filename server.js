require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

const initializeDatabase = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      mobile VARCHAR(255) NOT NULL,
      course VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS feedbacks (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      course VARCHAR(255),
      rating INTEGER NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );
};

app.get("/", (req, res) => {
  res.send("Riffs Academy Server is Running...");
});

app.get("/api/inquiries", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, mobile, course, message, created_at
       FROM inquiries
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      inquiries: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database Error",
    });
  }
});

app.get("/api/admin-data", async (req, res) => {
  try {
    const inquiriesResult = await pool.query(
      `SELECT id, full_name, email, mobile, course, message, created_at
       FROM inquiries
       ORDER BY id DESC`
    );

    const feedbacksResult = await pool.query(
      `SELECT id, full_name, email, course, rating, message, created_at
       FROM feedbacks
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      inquiries: inquiriesResult.rows,
      feedbacks: feedbacksResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database Error",
    });
  }
});

app.post("/api/inquiry", async (req, res) => {
  try {
    const {
      full_name,
      email,
      mobile,
      course,
      message,
    } = req.body;

    await pool.query(
      `INSERT INTO inquiries
      (full_name, email, mobile, course, message)
      VALUES ($1, $2, $3, $4, $5)`,
      [full_name, email, mobile, course, message]
    );

    res.status(200).json({
      success: true,
      message: "Inquiry submitted successfully!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database Error",
    });
  }
});

app.post("/api/feedback", async (req, res) => {
  try {
    const { full_name, email, course, rating, message } = req.body;

    await pool.query(
      `INSERT INTO feedbacks
      (full_name, email, course, rating, message)
      VALUES ($1, $2, $3, $4, $5)`,
      [full_name, email, course, rating, message]
    );

    res.status(200).json({
      success: true,
      message: "Feedback submitted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Database Error",
    });
  }
});
initializeDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database tables:", error);
    process.exit(1);
  });