"üse client";
import parseDate from "@/lib/dateParser";
import poolPromise from "@/lib/SQL_Config";

function function1() {}

function ConversationBox({ userid, conversation }) {
  // const user = await getUserFromDB(userid); cant get user here

  // console.log(user);
  return (
    <button onClick={function1}>
      <div className="flex flex-col max-h-96 overflow-auto custom-scrollbar gap-3 mt-3">
        <div key={user.user_id} className="flex gap-3">
          <img
            src={`/images/${user.profile_picture}`}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">
              {user.name}
              <span className="text-xs ml-1 text-neutral-400">
                {parseDate(conversation.last_updated)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ConversationBox;
