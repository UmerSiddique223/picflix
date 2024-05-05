import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    const { media, user_id } = payload;
    try {
        const pool = await poolPromise;

        const existingStory = await pool
            .request()
            .input("user_id", user_id)
            .query("SELECT story_id FROM Stories WHERE user_id = @user_id");

        let storyId;
        if (existingStory.recordset.length > 0) {
            storyId = existingStory.recordset[0].story_id;
        } else {
            const result = await pool
                .request()
                .input("user_id", user_id)
                .query(
                    `INSERT INTO Stories (user_id, created_at)
                    OUTPUT INSERTED.story_id
                    VALUES (@user_id, GETDATE());`
                );
            storyId = result.recordset[0].story_id;
        }
        const mediaWithType = media.map((item) => {
            if (item.type.startsWith("image")) {
                return `/images/${item.path}`;
            } else if (item.type.startsWith("video")) {
                return `/videos/${item.path}`;
            } else {
                return null;
            }
        });

        const mediaValues = mediaWithType
            .map((item) => `(${storyId}, 'story', '${item}')`)
            .join(", ");

        await pool.request().query(`
            INSERT INTO Media (entity_id, entity_type, media_url)
            VALUES ${mediaValues};
        `);

        return NextResponse.json({ message: "Story created successfully" });
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}