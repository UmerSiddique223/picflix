import poolPromise  from"../../lib/SQL_Config" ;
// import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM User`);
    return res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}