import CreateStory from "@/components/shared/CreateStory";
import PostCard from "@/components/shared/PostCard";
import StoryCard from "@/components/shared/StoryCard";
import poolPromise from "@/lib/SQL_Config";
import { getUserCookie } from "@/lib/userCookie";

export const getPosts = async (user) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("user_id", user.user_id).query(`
                SELECT Posts.*, Users.name, Users.profile_picture, Media.media_url AS media FROM SavedPosts
                LEFT JOIN Posts ON SavedPosts.post_id = Posts.post_id
                LEFT JOIN Media ON Posts.post_id = Media.entity_id
                JOIN Users ON Users.user_id=Posts.user_id
                WHERE SavedPosts.user_id=@user_id
                AND Media.entity_type= 'post'
                ORDER BY Posts.created_at DESC;
        `);
    const posts = result.recordset.reduce((acc, row) => {
      const existingPost = acc.find((post) => post.post_id === row.post_id);
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
      const existingPost = acc.find((story) => story.story_id === row.story_id);
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
};
export default async function Saved() {
  const user = getUserCookie();
  const stories = await getStories();
  const posts = await getPosts(user);
  return (
    <div className="flex w-full pr-8">
      <div className="flex-grow  w-2/3">
        <div className="flex flex-col items-center gap-10 py-10 sm:px-5 md:px-8 lg:p-10 custom-scrollbar">
          <h2 className="text-2xl font-bold tracking-tighter">Saved Posts</h2>
          <div className="flex flex-col gap-9 w-full">
            {posts.map((post) => (
              <PostCard key={post.post_id} user={user} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
