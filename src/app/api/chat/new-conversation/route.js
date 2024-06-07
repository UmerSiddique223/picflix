import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const { first_user, second_user } = payload;
  try {
    const { rows: result } =
      await sql`INSERT INTO Conversations (first_user, second_user, last_updated)
                VALUES (${first_user},${second_user}, ${new Date()})
                  RETURNING *;`;
    return NextResponse.json(result[0].conversation_id);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}
