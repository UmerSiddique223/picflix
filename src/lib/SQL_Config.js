// utils/db.js
import { ConnectionPool } from "mssql";

// Configure the database connection
const config = {
  server: process.env.SERVER,
  user: process.env.LOGINAME,
  password: process.env.PASSWORD,
  database: "picflix",
  options: {
    enableArithAbort: true,
    encrypt: false,
  },
};

// Create a pool of connections
const poolPromise = new ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

export default poolPromise;
