import poolPromise from "@/lib/SQL_Config";
import Image from "next/image";
import React from "react";

const SearchPage = async () => {
  const getFriends = async () => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().input("userId", 26).query(`
      select * from Users join Friends on users.[user_id]= Friends.friend_id where Friends.[user_id]=@userID
`);
      return result.recordset;
    } catch (error) {
      console.error("Error executing query:", error);
      return [];
    }
  };
  const friends = await getFriends();
  // console.log("jfeoijfoefwpofewkpofwe;l", friends);
  return (
    <div className="lg:-ml-20  mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-2">Existing Links</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
        {friends.map((user) => (
          <li
            key={user.user_id}
            className="flex flex-col items-center gap-2 h-44 w-44 p-4 border border-border rounded-lg shadow-md"
          >
            <div className="relative w-20 h-20">
              {user.profile_picture ? (
                <Image
                  src={`/images/${user.profile_picture}`}
                  alt={user.name}
                  fill
                  sizes="80px,80px"
                  className=" rounded-full mb-2"
                />
              ) : (
                <Image
                  src={`/images/default photo.png`}
                  alt={user.name}
                  fill
                  sizes="80px,80px"
                  className=" rounded-full mb-2"
                />
              )}
            </div>
            <p className="text-lg font-bold">{user.name}</p>
            <p className="text-sm text-purple-300">{user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
