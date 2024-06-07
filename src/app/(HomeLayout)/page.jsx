import CreateStory from "@/components/shared/CreateStory";
import PostCard from "@/components/shared/PostCard";
import StoryCard from "@/components/shared/StoryCard";
import { getUserCookie } from "@/lib/userCookie";
import { sql } from "@vercel/postgres";
export const getPosts = async (user) => {
  try {
    // query for posts
    const { rows, fields } = await sql`
      SELECT Posts.*, Users.name, Users.profile_picture, Media.media_url AS media
      FROM Posts
      JOIN Users ON Users.user_id = Posts.user_id
      JOIN Friends ON Users.user_id = Friends.friend_id
      LEFT JOIN Media ON Posts.post_id = Media.entity_id
      WHERE Friends.user_id = ${user.user_id} 
      AND Media.entity_type = 'post'

      UNION

      SELECT Posts.*, Users.name, Users.profile_picture, Media.media_url AS media
      FROM Posts
      JOIN Users ON Users.user_id = Posts.user_id
      LEFT JOIN Media ON Posts.post_id = Media.entity_id
      WHERE Users.user_id = ${user.user_id}
      AND Media.entity_type = 'post'

      ORDER BY created_at DESC
    `;

    const result = rows;
    const posts = result.reduce((acc, row) => {
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
    const { rows, fields } = await sql`
    SELECT Stories.*, Users.name, Users.profile_picture, Media.media_url AS media
    FROM Stories
    JOIN Users ON Users.user_id = Stories.user_id
    JOIN Friends ON Users.user_id = Friends.friend_id
    LEFT JOIN Media ON Stories.story_id = Media.entity_id
    WHERE Friends.user_id = ${user.user_id}
    AND Media.entity_type = 'story'
    
    UNION
    
    SELECT Stories.*, Users.name, Users.profile_picture, Media.media_url AS media
    FROM Stories
    JOIN Users ON Users.user_id = Stories.user_id
    LEFT JOIN Media ON Stories.story_id = Media.entity_id
    WHERE Users.user_id = ${user.user_id}
    AND Media.entity_type = 'story'
  `;

    const result = rows;
    const stories = result.reduce((acc, row) => {
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
