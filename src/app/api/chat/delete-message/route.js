import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    const { message_id } = payload;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("message_id", message_id)
            .query(
                `DELETE FROM Messages
                WHERE message_id = @message_id`
            );
            if (result.rowsAffected[0] === 0) {
                return NextResponse.error(new Error("Failed to delete Message"));
              }

            return NextResponse.json({ message: "Message Deleted successfully" });
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}