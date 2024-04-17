import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload= await request.json();
    const { caption, media, location, user_id } = payload;
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("user_id", user_id)
            .input("caption", caption)
            .input("num_likes", 0)
            .input("location", location)
            .query(
                `INSERT INTO Posts (user_id, caption, num_likes, created_at, location)
                OUTPUT INSERTED.post_id
                VALUES (@user_id, @caption, @num_likes, GETDATE(), @location);`
            );
        console.log(result)
        const postId = result.recordset[0].post_id;
        const mediaValues = media
            .map((item) => `(${postId}, '${item.path}')`)
            .join(", ");
        await pool.request().query(`
            INSERT INTO Media (post_id, media_url)
            VALUES ${mediaValues};
        `);
        return NextResponse.json({ message: "Post created successfully" });
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}
