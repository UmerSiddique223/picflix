import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const { message_id } = payload;
  try {
    const { rows: result } = await sql`DELETE FROM Messages
                WHERE message_id =${message_id}`;
    if (result.length === 0) {
      return NextResponse.error(new Error("Failed to delete Message"));
    }

    return NextResponse.json({ message: "Message Deleted successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}
