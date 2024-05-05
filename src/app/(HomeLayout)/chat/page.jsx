import ConversationBox from "@/components/shared/ConversationCard";
import poolPromise from "@/lib/SQL_Config";
import { getUserCookie } from "@/lib/userCookie";

export const getUserConversations = async (user) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().input("user_id", user.user_id)
            .query(`
                SELECT Conversations.*, User1.name, User1.profile_picture FROM Conversations
                INNER JOIN Users AS User1 ON Conversations.first_user = User1.user_id
                INNER JOIN Users AS User2 ON Conversations.second_user = User2.user_id
                WHERE Conversations.first_user=@user_id 
                OR Conversations.second_user=@user_id
        `);
        const conversations = result.recordset.map(row => ({
            ...row,
            media: [row.media]
        }));

        return conversations;

    } catch (err) {
        console.error("Error executing query:", err);
        return [];
    }
};

export default async function Saved() {
    const user = getUserCookie();
    const conversations = await getUserConversations(user);
    return (
        <div className="flex w-full pr-8">
          <div className="flex-grow w-2/3">
            <div className="flex flex-col items-center gap-10 py-10 sm:px-5 md:px-8 lg:p-10 custom-scrollbar">
              <h2 className="text-2xl font-bold tracking-tighter">Your Conversations</h2>
              <div className="flex flex-col gap-9 w-full">
                {conversations.map((conversation) => (
                  <ConversationBox userid={conversation.first_user === user.user_id ? conversation.second_user : conversation.first_user}
                  conversation={conversation}/>
                ))}
              </div>
            </div>
          </div>
            </div>
        );
}
