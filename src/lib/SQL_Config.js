// utils/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Configure the database connection
const { DATABASE } = process.env;

// Create a pool of connections
const poolPromise = open({
  filename: DATABASE,
  driver: sqlite3.Database
}).then((db) => {
  console.log('Connected to the SQLite database.');
  return db;
}).catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

export default poolPromise;