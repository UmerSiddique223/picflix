import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export async function POST(request) {
  const payload = await request.json();
  const { caption, media, location, user_id } = payload;
  try {
    const createdAt = new Date();
    const { rows } = await sql`
    INSERT INTO Posts (user_id, caption, created_at, location)
    VALUES (${user_id}, ${caption}, ${createdAt}, ${location})
    RETURNING post_id;
`;

    const postId = rows[0].post_id;
    const mediaWithType = media
      .map((item) => {
        if (item.type.startsWith("image")) {
          return { postId, type: "post", url: `/images/${item.path}` };
        } else if (item.type.startsWith("video")) {
          return { postId, type: "post", url: `/videos/${item.path}` };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null); // Filter out any null values

    for (const item of mediaWithType) {
      await sql`
        INSERT INTO Media (entity_id, entity_type, media_url)
        VALUES (${item.postId}, ${item.type}, ${item.url});
      `;
    }
    return NextResponse.json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}
