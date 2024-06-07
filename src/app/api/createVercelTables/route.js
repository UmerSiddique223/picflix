import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const usersResult = await sql`
      CREATE TABLE IF NOT EXISTS Users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        username VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        profile_picture VARCHAR(255),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const postsResult = await sql`
      CREATE TABLE IF NOT EXISTS Posts (
        post_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        caption TEXT,
        location VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const storiesResult = await sql`
      CREATE TABLE IF NOT EXISTS Stories (
        story_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const mediaResult = await sql`
      CREATE TABLE IF NOT EXISTS Media (
        entity_id INT,
        entity_type VARCHAR(50),
        media_url VARCHAR(255),
        PRIMARY KEY (entity_id, entity_type, media_url)
      );
    `;

    const commentsResult = await sql`
      CREATE TABLE IF NOT EXISTS Comments (
        comment_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        post_id INT REFERENCES Posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
        comment_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const likesResult = await sql`
      CREATE TABLE IF NOT EXISTS Likes (
        user_id INT,
        post_id INT,
        PRIMARY KEY (user_id, post_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `;

    const savedPostsResult = await sql`
      CREATE TABLE IF NOT EXISTS SavedPosts (
        user_id INT,
        post_id INT,
        PRIMARY KEY (user_id, post_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `;

    const friendsResult = await sql`
      CREATE TABLE IF NOT EXISTS Friends (
        user_id INT,
        friend_id INT,
        PRIMARY KEY (user_id, friend_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (friend_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `;

    const conversationsResult = await sql`
      CREATE TABLE IF NOT EXISTS Conversations (
        conversation_id SERIAL PRIMARY KEY,
        first_user INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        second_user INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const messagesResult = await sql`
      CREATE TABLE IF NOT EXISTS Messages (
        message_id SERIAL PRIMARY KEY,
        created_by INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        conversation_id INT REFERENCES Conversations(conversation_id) ON DELETE CASCADE ON UPDATE CASCADE,
        message_body TEXT NOT NULL,
        message_media_url VARCHAR(255),
        sent_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json(
      {
        usersResult,
        postsResult,
        storiesResult,
        mediaResult,
        commentsResult,
        likesResult,
        savedPostsResult,
        friendsResult,
        conversationsResult,
        messagesResult,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
