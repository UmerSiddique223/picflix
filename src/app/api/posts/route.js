import poolPromise from "@/lib/SQL_Config";
import { NextResponse } from "next/server";
import Filter from "bad-words";
export async function POST(request) {
  const payload = await request.json();
  const { caption, media, location, user_id } = payload;

  const filter = new Filter();
  filter.replaceWord = (badWord) => {
    return "***";
  };
  const filteredCaption = filter.clean(caption);
  const filteredLocation = filter.clean(location);

  try {
    const db = await poolPromise;
    const result = await db.run(
      `INSERT INTO Posts (user_id, caption, location) VALUES (?, ?, ?)`,
      user_id,
      filteredCaption,
      filteredLocation
    );

    const postId = result.lastID;

    const mediaWithType = media.map((item) => {
      if (item.type.startsWith("image")) {
        return `/images/${item.path}`;
      } else if (item.type.startsWith("video")) {
        return `/videos/${item.path}`;
      } else {
        return null;
      }
    });

    const mediaValues = mediaWithType
      .map((item) => `(${postId}, 'post', '${item}')`)
      .join(", ");

    await db.run(`
      INSERT INTO Media (entity_id, entity_type, media_url)
      VALUES ${mediaValues};
    `);
    return NextResponse.json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Error executing query:", err);
    return NextResponse.error(new Error("Error executing query"));
  }
}
