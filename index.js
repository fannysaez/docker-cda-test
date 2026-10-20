const express = require('express');
const mysql = require('mysql2/promise');
const app = express()
const port = 3000
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "cda",
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/', (req, res) => {
  res.send('Bonjour toi !')
});

app.get("/check", async (req, res) => {
  try{const [rows]= await pool.query("SELECT 1 + 1 AS result");
    res.json(rows);
  }
  catch(err){res.status(500).send("Erreur DB");}
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});