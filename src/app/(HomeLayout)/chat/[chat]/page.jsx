import MessagesContainer from "@/components/shared/MessagesContainer";
import { getUserCookie } from "@/lib/userCookie";
import { sql } from "@vercel/postgres";

export const getConversationMessages = async (conversation_id) => {
  try {
    // Log conversation ID for debugging

    const { rows: result } = await sql`
      SELECT Messages.*, Users.name, Users.profile_picture 
      FROM Messages
      INNER JOIN Users ON Messages.created_by = Users.user_id
      WHERE Messages.conversation_id = ${conversation_id}
      ORDER BY Messages.sent_on ASC
    `;

    const messages = result.map((row) => ({
      ...row,
      media: [row.media],
    }));

    return messages;
  } catch (err) {
    console.error("Error executing query:", err);
    return [];
  }
};

export const getConversationUsers = async (conversation_id) => {
  try {
    const { rows: result } = await sql`
  SELECT
    c.conversation_id,
    u1.user_id AS first_user_id,
    u1.username AS first_username,
    u2.user_id AS second_user_id,
    u2.username AS second_username,
    c.last_updated
  FROM Conversations c
  JOIN Users u1 ON c.first_user = u1.user_id
  JOIN Users u2 ON c.second_user = u2.user_id
  WHERE c.conversation_id = ${conversation_id}
`;
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error executing query:", err);
    return [];
  }
};

export const getUserFromDB = async (userid) => {
  const { rows: result } =
    await sql`SELECT * from Users where user_id = ${userid}`;
  return result[0];
};

export default async function Messages({ params }) {
  const user = getUserCookie();
  const conversation_id = params.chat;
  let first_user_id, second_user_id, first_user, second_user;
  const messages = await getConversationMessages(conversation_id);
  const users_info = await getConversationUsers(conversation_id);
  if (users_info != null) {
    first_user_id = users_info.first_user_id;
    second_user_id = users_info.second_user_id;
    if (user.user_id === first_user_id) {
      first_user = await getUserFromDB(first_user_id);
      second_user = await getUserFromDB(second_user_id);
    } else {
      first_user = await getUserFromDB(second_user_id);
      second_user = await getUserFromDB(first_user_id);
    }
  }
  return (
    <div className="flex w-full pr-8">
      <div className="flex-grow w-2/3">
        <div className="flex flex-col items-center gap-10 pt-10 sm:px-5 md:px-8 lg:px-10 custom-scrollbar">
          <div className="flex flex-col gap-9 w-full">
            <MessagesContainer
              user={first_user}
              otherUser={second_user}
              initialMessages={messages}
              conversation_id={conversation_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
