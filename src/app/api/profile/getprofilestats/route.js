import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
  const body = await req.json();
  const { user_id } = body;

  try {
    const { rows: result } = await sql`
    SELECT 
      Posts.*, 
      Users.name, 
      Users.profile_picture, 
      Media.media_url AS media 
    FROM 
      Posts
    JOIN 
      Users ON Users.user_id = Posts.user_id
    LEFT JOIN 
      Media ON Posts.post_id = Media.entity_id
    WHERE 
      Media.entity_type = 'post' 
      AND Posts.user_id = ${user_id}
    ORDER BY 
      Posts.created_at DESC;
  `;

    const postData = result.reduce((acc, row) => {
      const existingPost = acc.find((post) => post.post_id === row.post_id);
      if (existingPost) {
        existingPost.media.push(row.media);
      } else {
        acc.push({
          ...row,
          media: [row.media],
        });
      }
      return acc;
    }, []);

    const { rows: result1 } = await sql`
    SELECT COUNT(friend_id) AS totalLinks 
    FROM Friends 
    WHERE user_id = ${user_id};
  `;

    const totalLinks = result1[0].totallinks;
    return NextResponse.json({
      success: true,
      message: "Links and user got successfully",
      totalLinks: totalLinks,
      postData: postData,
    });
  } catch (error) {
    console.error("Error getting links and user:", error);
    return NextResponse.json({ error: "Failed to get Links and user" });
  }
}
