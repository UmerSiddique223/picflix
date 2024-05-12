import { NextResponse } from "next/server";
import poolPromise from "@/lib/SQL_Config";

export async function POST(req) {
  const body = await req.json();

  const { post_id } = body;
  const pool = await poolPromise;

  const result1 = await pool
    .request()
    .input("entity_id", post_id)
    .query(`DELETE FROM Media where entity_id=@entity_id`);
  if (result1.rowsAffected[0] === 0) {
    return NextResponse.error(new Error("Failed to delete Media"));
  }
  const result = await pool
    .request()
    .input("post_id", post_id)
    .query(`DELETE FROM posts where post_id=@post_id`);
  if (result.rowsAffected[0] === 0) {
    return NextResponse.error(new Error("Failed to delete Post"));
  }
  console.log(result1.rowsAffected[0], result.rowsAffected[0], "SQSSQ");

  return NextResponse.json({ message: "Profile updated successfully" });
}
