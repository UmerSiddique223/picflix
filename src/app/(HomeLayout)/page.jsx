import CreateStory from "@/components/shared/CreateStory";
import PostCard from "@/components/shared/PostCard";
import StoryCard from "@/components/shared/StoryCard";
import poolPromise from "@/lib/SQL_Config";
import { getUserCookie } from "@/lib/userCookie";

export const getPosts = async (user) => {
  try {
    const pool = await poolPromise;

    // query for posts
    const result = await pool
      .request()
      .input("user_id", user.user_id)
      .execute("GetFriendPosts");

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
    console.error("Error fetching posts:", err);
    return [];
  }
};
export const getStories = async (user) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("userId", user.user_id)
      .execute("GetFriendStories");
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
export default async function Home() {
  const user = getUserCookie();
  const posts = await getPosts(user);
  const stories = await getStories(user);
  return (
    <div className="flex flex-col lg:flex-row w-full lg:pr-8">
      <div className="lg:hidden mt-6">
        <h2 className="text-xl mb-4 text-center font-bold tracking-tighter">
          Stories & Updates
        </h2>

        <div className="flex flex-col w-full">
          {stories.map((story) => (
            <StoryCard key={story.story_id} story={story} />
          ))}
        </div>
      </div>
      <div className="lg:flex-grow lg:w-2/3">
        <div className="flex flex-col items-center gap-10 py-10 px-2 md:px-8 lg:p-10 custom-scrollbar">
          <h2 className="text-2xl font-bold tracking-tighter">Home Feed</h2>
          <div className="flex flex-col justify-center items-center gap-9 w-full">
            {posts.map((post) => (
              <PostCard key={post.post_id} user={user} post={post} />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/3 mt-28">
        <h2 className="text-xl mb-4 text-center font-bold tracking-tighter">
          Stories & Updates
        </h2>

        <div className="flex flex-col w-full">
          {stories.map((story) => (
            <StoryCard key={story.story_id} story={story} />
          ))}
        </div>
      </div>
      <div>
        <CreateStory />
      </div>
    </div>
  );
}
