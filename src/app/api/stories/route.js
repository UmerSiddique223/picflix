import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// POST handler to create a story
export async function POST(request) {
  const payload = await request.json();
  const { media, user_id } = payload;

  try {
    const { rows: existingStory } = await sql`
      SELECT story_id FROM Stories WHERE user_id = ${user_id};
    `;

    let storyId;
    if (existingStory.length > 0) {
      storyId = existingStory[0].story_id;
    } else {
      const createdAt = new Date();
      const { rows } = await sql`
        INSERT INTO Stories (user_id, created_at)
        VALUES (${user_id}, ${createdAt})
        RETURNING story_id;
      `;
      storyId = rows[0].story_id;
    }

    const mediaWithType = media
      .map((item) => {
        if (item.type.startsWith("image")) {
          return {
            entityId: storyId,
            type: "story",
            url: `/images/${item.path}`,
          };
        } else if (item.type.startsWith("video")) {
          return {
            entityId: storyId,
            type: "story",
            url: `/videos/${item.path}`,
          };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null); // Filter out any null values

    for (const item of mediaWithType) {
      await sql`
        INSERT INTO Media (entity_id, entity_type, media_url)
        VALUES (${item.entityId}, ${item.type}, ${item.url});
      `;
    }

    return NextResponse.json({
      message: "Story created successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error executing query:", err);
    if (err.code === "23505") {
      // Unique violation error code for PostgreSQL
      return NextResponse.json({
        message: "Duplicate key error",
        duplicate: true,
        success: false,
      });
    } else {
      return NextResponse.json({
        message: "Error executing query",
        success: false,
      });
    }
  }
}

// DELETE handler to delete a story
export async function DELETE(request) {
  const payload = await request.json();
  const { story_id } = payload;

  try {
    await sql`
      DELETE FROM Stories WHERE story_id = ${story_id};
    `;
    return NextResponse.json({ message: "Story deleted successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.json({
      message: "Error executing query",
      success: false,
    });
  }
}
