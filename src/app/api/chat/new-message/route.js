import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    const { message_body, user_id, conversation_id } = payload;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("user_id", user_id)
            .input("message", message_body)
            .input("conversation_id", conversation_id)
            .query(
                `INSERT INTO Messages (created_by, conversation_id, message_body, sent_on)
                OUTPUT INSERTED.*
                VALUES (@user_id, @conversation_id, @message, GETDATE());

                UPDATE Conversations SET last_updated = GETDATE() where conversation_id = @conversation_id;`
            );
        return NextResponse.json(result.recordset[0]);
    } catch (err) {
        console.error("Error executing query:", err);
        return NextResponse.error(new Error("Error executing query"));
    }
}