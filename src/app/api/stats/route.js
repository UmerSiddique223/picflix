import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const { post_id, user_id } = payload;

  try {
    let result = {};

    // Fetch comments
    const { rows: comments } = await sql`
      SELECT Comments.*, Users.name, Users.profile_picture 
      FROM Comments
      JOIN Users ON Users.user_id = Comments.user_id
      WHERE Comments.post_id = ${post_id}
    `;
    result.comments = comments;

    // Fetch likes
    const { rows: likes } = await sql`
      SELECT user_id AS likes
      FROM Likes
      WHERE post_id = ${post_id}
    `;
    result.likes = likes;

    // Check if post is saved
    const { rows: saved } = await sql`
      SELECT *
      FROM SavedPosts
      WHERE post_id = ${post_id} AND user_id = ${user_id}
    `;
    result.isSaved = saved.length > 0;

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.json(
      { error: "Error executing query" },
      { status: 500 }
    );
  }
}
