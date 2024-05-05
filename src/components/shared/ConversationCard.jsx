import parseDate from "@/lib/dateParser";
import poolPromise from "@/lib/SQL_Config";

export const getUserFromDB = (userid) => {
    return poolPromise.then(pool => {
      return pool.request().input("user_id", userid)
        .query(`
          SELECT * from Users where user_id = @user_id;
        `);
    }).then(result => {
      if (result.recordset.length > 0) {
        return result.recordset[0];
      } else {
        // If no user found, return null or handle it as per your requirement
        return null;
      }
    }).catch(err => {
      console.error("Error executing query:", err);
      return []; // or return null or handle it as per your requirement
    });
  };
  


async function ConversationBox({ userid,conversation }) {
    const user = await getUserFromDB(userid);
    console.log(user);
    return (
        <div>
            <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
                    <div key={user.user_id} className="flex gap-3">
                        <img
                            src={`/images/${user.profile_picture}`}
                            alt="user"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-semibold">{user.name}<span className="text-xs ml-1 text-neutral-400">{parseDate(conversation.last_updated)}</span></p>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default ConversationBox;
