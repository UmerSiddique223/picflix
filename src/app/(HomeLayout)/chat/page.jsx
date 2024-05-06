import ConversationBox from "@/components/shared/ConversationCard";
import poolPromise from "@/lib/SQL_Config";
import { getUserCookie } from "@/lib/userCookie";
import { getUser } from "@/lib/userInfo";

export const getUserConversations = async (user) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("user_id", user.user_id).query(`
                SELECT Conversations.*, User1.name, User1.profile_picture FROM Conversations
                INNER JOIN Users AS User1 ON Conversations.first_user = User1.user_id
                INNER JOIN Users AS User2 ON Conversations.second_user = User2.user_id
                WHERE Conversations.first_user=@user_id 
                OR Conversations.second_user=@user_id
        `);
    const conversations = result.recordset.map((row) => ({
      ...row,
      media: [row.media],
    }));

    return conversations;
  } catch (err) {
    console.error("Error executing query:", err);
    return [];
  }
};
// get all user at the same time

export const getUserFromDB = (userid) => {
  return poolPromise
    .then((pool) => {
      return pool.request().input("user_id", userid).query(`
          SELECT * from Users where user_id = @user_id;
        `);
    })
    .then((result) => {
      if (result.recordset.length > 0) {
        return result.recordset[0];
      } else {
        // If no user found, return null or handle it as per your requirement
        return null;
      }
    })
    .catch((err) => {
      console.error("Error executing query:", err);
      return []; // or return null or handle it as per your requirement
    });
};

export default async function Conversations() {
  const user = getUserCookie();
  const conversations = await getUserConversations(user);
  // This is sample code
//   const allUsers=await getAllUsers();
// const user = await getUserFromDB();
  return (
    <div className="flex w-full pr-8">
      <div className="flex-grow w-2/3">
        <div className="flex flex-col items-center gap-10 py-10 sm:px-5 md:px-8 lg:p-10 custom-scrollbar">
          <h2 className="text-2xl font-bold tracking-tighter">
            Your Conversations
          </h2>
          <div className="flex flex-col gap-9 w-full">
            {/* Here, make this clickable please.   okk */}

            {conversations.map(async (conversation) => {
              const otherUserId = conversation.first_user === user.user_id
                ? conversation.second_user
                : conversation.first_user;
              const userInfo = await getUserFromDB(otherUserId);

              return (
                <ConversationBox
                  key={conversation.conversation_id}
                  user={userInfo} // Pass user info as prop
                  conversation={conversation}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
