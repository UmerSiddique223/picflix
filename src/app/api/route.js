import poolPromise  from"../../lib/SQL_Config" ;
import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    const db = await poolPromise;
    const result = await db.all(`SELECT * FROM User`);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}