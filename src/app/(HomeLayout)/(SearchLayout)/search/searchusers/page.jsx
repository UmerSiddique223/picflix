import poolPromise from "@/lib/SQL_Config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchProfilePage = async ({ searchParams }) => {
  const query = searchParams.query;
  const getSearchResults = async () => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query(
          `SELECT * FROM Users WHERE name LIKE '%${query}%' OR username LIKE '%${query}%'`
        );
      return result.recordset;
    } catch (error) {
      console.error("Error executing query:", error);
      return [];
    }
  };

  const Users = await getSearchResults();
  return (
    <>
      {Users.length > 0 ? (
        <div className="lg:-ml-20  mx-auto">
          <h1 className="text-2xl font-bold mt-4 mb-2">Search Results</h1>
          <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
            {Users.map((user) => (
              <Link
                key={user.user_id}
                href={`/profile/${user.user_id}`}
                className="flex flex-col items-center gap-2 min-h-44 min-w-44 p-4 border border-border rounded-lg shadow-md"
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
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <h1 className="text-lg font-bold mt-20 text-red-800">
          Oops!. No User found. Try again.
        </h1>
      )}
    </>
  );
};

export default SearchProfilePage;
