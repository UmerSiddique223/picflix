import poolPromise  from"../../../lib/SQL_Config" ;
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT Posts.*, Users.name, Users.profile_picture AS profile_pic, Media.media_url AS media FROM Posts
    JOIN Users ON Users.user_id=Posts.user_id
    LEFT JOIN Media ON Posts.post_id = Media.post_id`);
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}