import PostCard from "@/components/shared/PostCard";
import poolPromise from "@/lib/SQL_Config";
import { getUserCookie } from "@/lib/userCookie";

export const getPosts = async (user) => {
    try {
        const db = await poolPromise;
        const posts = await db.all(
            `SELECT Posts.*, Users.name, Users.profile_picture, Media.media_url AS media
          FROM Posts
          JOIN Users ON Users.user_id = Posts.user_id
          JOIN Friends ON Users.user_id = Friends.friend_id
          LEFT JOIN Media ON Posts.post_id = Media.entity_id
          WHERE Friends.user_id = ?
          AND Media.entity_type = 'post'
          UNION
          SELECT Posts.*, Users.name, Users.profile_picture, Media.media_url AS media
          FROM Posts
          JOIN Users ON Users.user_id = Posts.user_id
          LEFT JOIN Media ON Posts.post_id = Media.entity_id
          WHERE Users.user_id = ?
          AND Media.entity_type = 'post'
          ORDER BY created_at DESC;`,
            user.user_id,
            user.user_id
        );

        const result = posts.reduce((acc, row) => {
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

        return result;
    } catch (err) {
        console.error("Error fetching posts:", err);
        return [];
    }
};

export default async function Home() {
    const user = getUserCookie();
    const posts = await getPosts(user);
    return (
        <div className="w-full lg:pr-8">
            <div className="flex flex-col gap-10 py-10 px-2 md:px-8 lg:p-10 custom-scrollbar">
                <h2 className="text-2xl text-center font-bold tracking-tighter">
                    Home Feed
                </h2>
                <div className="flex flex-col justify-center items-center gap-9">
                    {posts.map((post) => (
                        <PostCard key={post.post_id} user={user} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
