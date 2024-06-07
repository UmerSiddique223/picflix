import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const post = content.params.comment;
  try {
    const { rows: result } =
      await sql`SELECT Comments.*, Users.name, Users.profile_picture FROM Comments
            JOIN Users ON Users.user_id=Comments.user_id
            WHERE post_id = ${post}`;
    return NextResponse.json(result);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}

export async function POST(request, content) {
  const post = content.params.comment;
  const payload = await request.json();
  const { user_id, comment_text } = payload;
  try {
    const { rows: result } =
      await sql`INSERT INTO Comments (user_id, post_id, comment_text, created_at)
                VALUES (${user_id}, ${post_id}, ${comment}, ${new Date()})
                  RETURNING *;`;
    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}
