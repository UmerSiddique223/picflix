import poolPromise  from"../../lib/SQL_Config" ;
import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM [User]`);
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}