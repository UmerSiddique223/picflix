import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { user_id } = body;

  try {
    const pool = await poolPromise;

    const result = await pool.request().input("user_id", user_id).query(`
    SELECT Posts.*, Media.media_url AS media
    FROM Posts
    JOIN Users ON Users.user_id = Posts.user_id
    LEFT JOIN Media ON Posts.post_id = Media.entity_id
    LEFT JOIN Friends ON Users.user_id = Friends.user_id
    WHERE Posts.user_id = @user_id
    ORDER BY Posts.created_at DESC;`);

    const postData = result.recordset.reduce((acc, row) => {
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

    const result1 = await pool
      .request()
      .input("user_id", user_id)
      .query(
        "select count(friend_id)as totalLinks from Friends where user_id=@user_id"
      );

    const totalLinks = result1.recordset[0].totalLinks;

    // Respond with success message
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
