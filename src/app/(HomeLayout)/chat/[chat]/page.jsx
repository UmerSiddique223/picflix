import MessagesContainer from "@/components/shared/MessagesContainer";
import { getUserCookie } from "@/lib/userCookie";
import poolPromise from "@/lib/SQL_Config";

export const getConversationMessages = async (conversation_id) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("conversation_id", conversation_id).query(`
                  SELECT Messages.*, Users.name, Users.profile_picture FROM Messages
                  INNER JOIN Users ON Messages.created_by = Users.user_id
                  WHERE Messages.conversation_id=@conversation_id
                  ORDER BY Messages.sent_on ASC
          `);
        const messages = result.recordset.map((row) => ({
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
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("conversation_id", conversation_id).query(`
        SELECT
        c.conversation_id,
        u1.user_id AS first_user_id,
        u1.username AS first_username,
        u2.user_id AS second_user_id,
        u2.username AS second_username,
        c.last_updated
        FROM
            Conversations c
        JOIN
            Users u1 ON c.first_user = u1.user_id
        JOIN
            Users u2 ON c.second_user = u2.user_id

        where conversation_id = @conversation_id;
          `);

        if (result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error executing query:", err);
        return [];
    }
};

export const getUserFromDB = async (userid) => {
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
                return null;
            }
        })
        .catch((err) => {
            console.error("Error executing query:", err);
            return [];
        });
};

export default async function Messages({ params }) {
    const user = getUserCookie();
    const conversation_id = params.chat;
    //   const conversations = await getUserConversations(user);
    // This is sample code
    //   const allUsers=await getAllUsers();
    // const user = await getUserFromDB();
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
                <div className="flex flex-col items-center gap-10 py-10 sm:px-5 md:px-8 lg:p-10 custom-scrollbar">
                    <h2 className="text-2xl font-bold tracking-tighter"></h2>
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
