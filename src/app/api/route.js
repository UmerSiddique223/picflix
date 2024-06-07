import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    const result = await sql`SELECT * FROM Users`;
    return NextResponse.json(result);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
