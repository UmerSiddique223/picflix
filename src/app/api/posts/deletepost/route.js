import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
  const body = await req.json();

  const { post_id } = body;

  const { rows: result1 } =
    await sql`DELETE FROM Media where entity_id=${post_id}`;
  if (result1.length === 0) {
    return NextResponse.error(new Error("Failed to delete Media"));
  }
  const { rows: result } =
    await sql`DELETE FROM posts where post_id=${post_id}`;
  if (result.length === 0) {
    return NextResponse.error(new Error("Failed to delete Post"));
  }

  return NextResponse.json({ message: "Profile updated successfully" });
}
