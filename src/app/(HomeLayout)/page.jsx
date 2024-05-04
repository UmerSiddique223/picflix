import PostCard from "@/components/shared/PostCard";
import StoryCard from "@/components/shared/StoryCard";
import poolPromise from "@/lib/SQL_Config";
import { getUserCookie } from "@/lib/userCookie";

export const getPosts = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
        SELECT Posts.*, Users.name, Users.profile_picture, Media.media_url AS media FROM Posts
        JOIN Users ON Users.user_id=Posts.user_id
        LEFT JOIN Media ON Posts.post_id = Media.entity_id
        WHERE Media.entity_type= 'post'
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
        console.error("Error fetching posts:", err);
        return [];
    }
};
export const getStories = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
        SELECT Stories.*, Users.name, Users.profile_picture, Media.media_url AS media FROM Stories
        JOIN Users ON Users.user_id=Stories.user_id
        LEFT JOIN Media ON Stories.story_id = Media.entity_id
        WHERE Media.entity_type='story'
        ORDER BY Stories.created_at DESC;
        `);
        const stories = result.recordset.reduce((acc, row) => {
            const existingPost = acc.find(
                (story) => story.story_id === row.story_id
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

        return stories;
    } catch (err) {
        console.error("Error in fetching stories:", err);
        return [];
    }
}
export default async function Home() {
    const posts = await getPosts();
    const stories = await getStories();
    const user = getUserCookie();
    return (
        <div className="flex w-full pr-8">
            <div className="flex-grow w-2/3">
                <div className="flex flex-col items-center gap-10 py-10 sm:px-5 md:px-8 lg:p-10 custom-scrollbar">
                    <h2 className="text-2xl font-bold tracking-tighter">
                        Home Feed
                    </h2>
                    <div className="flex flex-col gap-9 w-full">
                        {posts.map((post) => (
                            <PostCard
                                key={post.post_id}
                                user={user}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className=" hidden lg:block w-1/3 mt-28">
                <h2 className="text-xl mb-4 text-center font-bold tracking-tighter">
                    Stories & Updates
                </h2>

                <div className="flex flex-col w-full">
                    {stories.map((story) => (
                        <StoryCard key={story.story_id} story={story} />
                    ))}
                </div>
            </div>
        </div>
    );
}
