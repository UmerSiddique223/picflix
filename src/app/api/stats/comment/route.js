import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const { post_id, user_id, comment_text } = payload;

  try {
    const result = await sql`
            INSERT INTO Comments (user_id, post_id, comment_text, created_at)
            VALUES (${user_id}, ${post_id}, ${comment_text}, ${new Date()})
            RETURNING *;
        `;

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}
