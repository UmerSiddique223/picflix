import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const { message_body, user_id, conversation_id } = payload;
  try {
    const { rows: result } =
      await sql`INSERT INTO Messages (created_by, conversation_id, message_body, sent_on)
                VALUES (${user_id}, ${conversation_id}, ${message_body}, ${new Date()})
                RETURNING *;`;

    await sql`UPDATE Conversations SET last_updated = ${new Date()} where conversation_id = ${conversation_id};`;
    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}
