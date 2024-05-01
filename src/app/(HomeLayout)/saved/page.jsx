import PostCard from "@/components/shared/PostCard";
import poolPromise from "@/lib/SQL_Config";
import { getUser } from "@/lib/userInfo";

export const getPosts = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .query(`
        SELECT Posts.*, Users.name, Users.profile_picture, Media.media_url AS media FROM SavedPosts
        LEFT JOIN Posts ON SavedPosts.post_id = Posts.post_id
        LEFT JOIN Media ON Posts.post_id = Media.post_id
        JOIN Users ON Users.user_id=Posts.user_id
        WHERE SavedPosts.user_id=1
        ORDER BY Posts.created_at DESC;
        `);
        const posts = result.recordset.reduce((acc, row) => {
            const existingPost = acc.find(
                (post) => post.post_id === row.post_id
            );
            if (existingPost) {
                existingPost.media.push(row.media);
            } else {
                acc.push({
                    ...row,
                    media: [row.media],
                });
            }
            return acc;
        }, []);

    return posts;
  } catch (err) {
    console.error("Error executing query:", err);
    return [];
  }
};

export default async function Saved() {
    const posts = await getPosts();
    return (
        <div className="flex ">
            <div className="flex-grow w-3/4">
                <div className="flex flex-col items-center gap-10 py-10 sm:px-5 md:px-8 lg:p-10 custom-scrollbar">
                    <h2 className="text-2xl font-bold tracking-tighter">
                        Saved Posts
                    </h2>
                    <div className="flex flex-col gap-9 w-full">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
            {/* //Right side  data */}
            <div className=" hidden lg:block ">Right data</div>
        </div>
    );
}
